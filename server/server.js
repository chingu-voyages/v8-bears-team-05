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
  console.log('testing...');
});

// Stores draw history for all users
const drawHistory = {};

// Stores redo history for all users
const redoHistory = {};

// Stores user generated IDs
const currentGenIDs = []; // Remove this, and add disconnect state....

// Listens socket req on Port 7000
io.listen(7000);

// Connect with boardeditor front-end
io.of('/boardandeditor').on('connection', socket => {
  // Generates the id on the server and creates a new room
  socket.on('create-room', id => {
    if (!currentGenIDs.includes(id)) {
      currentGenIDs.push(id);
      drawHistory[id] = [];
      redoHistory[id] = [];
      // console.log(drawHistory)
      socket.join(id);
    } else {
      socket.emit('err', `This id: ${id} is already in use.`);
    }
  });

  // Joins the user to the existing room
  socket.on('join-room', id => {
    if (currentGenIDs.includes(id)) {
      // console.log(drawHistory);
      socket.join(id);

      // Event handler for new incoming connections   -- It will only work if you go to the URL endpoint '/boardandeditor' directly for now.

      const sendData = (drawHistory[id])[drawHistory[id].length - 1];

      // Draws the canvas for the new socket
      socket.emit('draw-line', sendData);
    } else {
      socket.emit('err', `The entered id: ${id} is invalid.`);
    }
  });

  // draw canvas for all users
  socket.on('store-data', res => {
    // Save the drawn paths to the drawHistory
    const id = res.room;
    if (!(drawHistory[id]).includes(res.data)) {
      drawHistory[id].push(res.data);
      socket.broadcast.to(id).emit('draw-line', res.data);
    }
  });

  // undo canvas for all users
  socket.on('undo-canvas', (res) => {
    const id = res.room;
    redoHistory[id].unshift(drawHistory[id].pop());
    socket.broadcast.to(id).emit('undo-canvas');
  });

  // redo canvas for all users
  socket.on('redo-canvas', (res) => {
    const id = res.room;
    const data = redoHistory[id].shift();
    drawHistory[id].push(data);
    socket.broadcast.to(id).emit('redo-canvas');
  });

  // clear canvas for all users
  socket.on('clear-canvas', (res) => {
    const id = res.room;
    drawHistory[id].length = 0;
    redoHistory[id].length = 0;
    socket.broadcast.to(id).emit('clear-canvas');
  });
});
