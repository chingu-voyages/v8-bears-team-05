const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 4000;
// const server = app.listen(port)
const http = require('http');

const server = http.createServer(app);
const io = require('socket.io').listen(server);
const cors = require('cors');

// const server = app.listen(port)
server.listen(process.env.PORT || 4000);

io.set('origins', '*:*');

app.use(cors());
app.use(express.static(path.join(__dirname, '../build')));
// app.use(express.static(path.join(__dirname, '../public')));

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Express server is running on http://localhost:${port}/`));

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
} else {
  app.use(express.static(path.join(__dirname, '../public')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
  });
}

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
// io.listen(7000);

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
      userOnline[id].user = [];
      // console.log(drawHistory)
      socket.join(id);
      socket.emit('notify', {
        message: `You aren't connected to the server yet. Tap 'Host a meeting' or 'Join a Meeting' to start the meeting.`,
        type: 'warning',
        toggle: false,
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
      socket.emit('join-chat', { online: userOnline[id].online, messages: chatData });

      // Updates Online Count of every user except newly added user
      socket.to(id).emit('online-count', userOnline[id].online);

      // Notifies all users except the newly added user
      socket.to(id).emit('notify', { message: `A new user has been connected to this ID: ${id}.`, type: 'info' });
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

  // Notify others about user available to chat
  socket.on('chat-notify', res => {
    const id = res.room;
    if (userOnline[id].user.includes(res.data)) {
      socket.emit('notify', { message: `${res.data} username is already taken.`, type: 'danger' });
    } else {
      userOnline[id].user.push(res.data);
      socket.emit('add-user', res.data);
      socket.broadcast.to(id).emit('notify', { message: `${res.data} is now available to chat.`, type: 'default' });
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

        // Updates Online Count of every user except newly added user
        socket.to(roomID).emit('online-count', userOnline[roomID].online);

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
