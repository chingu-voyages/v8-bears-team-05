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

// Stores draw history
const drawHistory = [];

// Stores redo history
const redoHistory = [];

// Listens socket req on Port 7000
io.listen(7000);

// Connect with boardeditor front-end
io.of('/boardandeditor').on('connection', client => {
  // Event handler for new incoming connections   -- It will only work if you go to the URL endpoint '/boardandeditor' directly for now.

  // Draws the canvas for the new client
  const sendData = drawHistory[drawHistory.length - 1];
  // console.log(sendData);
  client.emit('draw-line', sendData);

  // draw canvas for all users
  client.on('store-data', lineData => {
    // Save the drawn paths to the drawHistory
    if (!drawHistory.includes(lineData)) {
      drawHistory.push(lineData);
      client.broadcast.emit('draw-line', lineData);
    }
    // console.log(data);
  });

  // undo canvas for all users
  client.on('undo-canvas', () => {
    redoHistory.unshift(drawHistory.pop());
    client.broadcast.emit('undo-canvas');
  });

  // redo canvas for all users
  client.on('redo-canvas', () => {
    const data = redoHistory.shift();
    drawHistory.push(data);
    client.broadcast.emit('redo-canvas');
  });

  // clear canvas for all users
  client.on('clear-canvas', () => {
    drawHistory.length = 0;
    redoHistory.length = 0;
    client.broadcast.emit('clear-canvas');
  });
});
