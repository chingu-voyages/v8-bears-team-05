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
      redoHistory[id] = [];
      userOnline[id] = { online: 1 };
      // console.log(drawHistory)
      socket.join(id);
    } else {
      socket.emit('success', `Your ID: ${id} is successfully hosted for your meeting.`);
    }
  });

  // Joins the user to the existing room
  socket.on('join-room', id => {
    if (id === '') {
      socket.emit('err', `Your ID field cannot be blank.`);
    } else if (id in drawHistory) {
      // Cancel deletion if data in deleteData
      if (id in deleteData) {
        clearTimeout(deleteData[id]);
      }
      // console.log(drawHistory);
      socket.join(id);

      userOnline[id].online += 1;
      // Get data for drawing
      const sendData = drawHistory[id][drawHistory[id].length - 1];

      // Sends success confirmation
      socket.emit('join-success', id);

      // Draws the canvas for the new socket
      socket.emit('draw-line', sendData);
    } else {
      socket.emit('err', `Your entered ID: ${id} is invalid.`);
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
    redoHistory[id].push(drawHistory[id].pop());
    // console.log(redoHistory)
    socket.broadcast.to(id).emit('undo-canvas');
  });

  // redo canvas for all users
  socket.on('redo-canvas', res => {
    const id = res.room;
    const data = redoHistory[id].pop();
    drawHistory[id].push(data);
    // console.log(redoHistory)
    socket.broadcast.to(id).emit('redo-canvas');
  });

  // clear canvas for all users
  socket.on('clear-canvas', res => {
    const id = res.room;
    drawHistory[id].length = 0;
    redoHistory[id].length = 0;
    socket.broadcast.to(id).emit('clear-canvas');
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
