const express = require('express');
const path = require('path');

const app = express();
const port = 4000;
// const server = app.listen(port)
const http = require('http');

const server = http.createServer(app);
const io = require('socket.io')(server, { transports: ['websocket', 'polling'] });
const cors = require('cors');

// const server = app.listen(port)

io.set('origins', '*:*');

app.use(cors());
// app.use(express.static(path.join(__dirname, '../build')));
app.use(express.static(path.join(__dirname, '../public')));

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Express server is running on http://localhost:${port}/`));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
  // console.log('testing...');
});

// Stores draw history for all users
const drawHistory = {};

// Stores text editor for all users
const textStore = {};

// Stores user chat history
const chatHistory = {};

// Stores redo history for all users
const redoHistory = {};

// Current User Status
const userOnline = {};

// Delete data after the set time
const deleteData = {};

// Listens socket req on Port 7000
io.listen(7000);

// Connect with boardeditor front-end
io.of('/boardandeditor').on('connection', socket => {
  // Generates the id on the server and creates a new room
  socket.on('create-room', id => {
    if (!(id in drawHistory)) {
      drawHistory[id] = [];
      textStore[id] = '';
      chatHistory[id] = [];
      redoHistory[id] = [];
      userOnline[id] = { online: 1 };
      // console.log(drawHistory)
      socket.join(id);
      socket.emit('notify', {
        message: `You aren't connected to the server yet. Tap 'Host a meeting' or 'Join a Meeting' to start the meeting.`,
        type: 'warning',
      });
    } else {
      socket.emit('notify', { message: `This ID: ${id} is successfully hosted for your meeting.`, type: 'success' });
    }
  });

  // Joins the user to the existing room
  socket.on('join-room', id => {
    if (id === '') {
      socket.emit('notify', { message: `Your ID field cannot be blank.`, type: 'danger' });
    } else if (id in drawHistory) {
      // Cancel deletion if data in deleteData
      if (id in deleteData) {
        clearTimeout(deleteData[id]);
      }
      // console.log(drawHistory);
      socket.join(id);

      userOnline[id].online += 1;
      // Get data for drawing and text
      const sendData = drawHistory[id][drawHistory[id].length - 1];
      const textData = textStore[id];
      const chatData = chatHistory[id];

      // Sends success confirmation
      socket.emit('join-success', id);

      // Draws the canvas to the new socket
      socket.emit('draw-line', sendData);

      // Sends the Text Data to the new socket
      socket.emit('text-editor', textData);

      // Sends the Chat Data to the new socket
      socket.emit('join-chat', chatData);
    } else {
      socket.emit('notify', { message: `Your entered ID: ${id} is invalid.`, type: 'danger' });
    }
  });

  // draw canvas for all users
  socket.on('store-data', res => {
    // Save the drawn paths to the drawHistory
    const id = res.room;
    if (id in drawHistory && !drawHistory[id].includes(res.data)) {
      drawHistory[id].push(res.data);
      socket.broadcast.to(id).emit('draw-line', res.data);
    }
    // else { console.log(res) }  // For Debugging
  });

  // undo canvas for all users
  socket.on('undo-canvas', res => {
    const id = res.room;
    if (id in redoHistory && id in drawHistory) {
      redoHistory[id].push(drawHistory[id].pop());
      // console.log(redoHistory)
      socket.broadcast.to(id).emit('undo-canvas');
    }
  });

  // redo canvas for all users
  socket.on('redo-canvas', res => {
    const id = res.room;
    if (id in redoHistory && id in drawHistory) {
      const data = redoHistory[id].pop();
      drawHistory[id].push(data);
      // console.log(redoHistory)
      socket.broadcast.to(id).emit('redo-canvas');
    }
  });

  // clear canvas for all users
  socket.on('clear-canvas', res => {
    const id = res.room;
    drawHistory[id].length = 0;
    redoHistory[id].length = 0;
    socket.broadcast.to(id).emit('clear-canvas');
  });

  // Receive data for text editor
  socket.on('text-editor', res => {
    const id = res.room;
    if (id in textStore && !textStore[id].includes(res.data)) {
      textStore[id] = res.data;
      socket.broadcast.to(id).emit('text-editor', res.data);
    }
  });

  // Store chat history of the users
  socket.on('chat-history', res => {
    const id = res.room;
    if (id in chatHistory) {
      chatHistory[id].push(res.data);
      socket.broadcast.to(id).emit('chat-history', res.data);
    }
  });

  // Clean up memory on disconnect
  socket.on('disconnecting', () => {
    // console.log(Object.keys(socket.rooms));

    for (let i = 1; i < Object.keys(socket.rooms).length; i += 1) {
      // Get disconnected room ID
      const roomID = Object.keys(socket.rooms)[i];
      // console.log(roomID)
      if (roomID in userOnline) {
        userOnline[roomID].online -= 1;

        // Wipe data if the user does not come back within a minute
        if (userOnline[roomID].online === 0) {
          deleteData[roomID] = setTimeout(() => {
            delete drawHistory[roomID];
            delete textStore[roomID];
            delete chatHistory[roomID];
            delete redoHistory[roomID];
            delete userOnline[roomID];
            delete deleteData[roomID];
          }, 60000);
        }
      }
    }
    // console.log(userOnline)  // Debugging Purposes
  });
});
