const express = require('express');
const path = require('path');
const router = require('./route/route');
const app = express();
const port = 3030;
// const server = app.listen(port)
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {'transports': ['websocket', 'polling']}, { path: '/api/boardandeditor'});

app.use('/api', router);

// app.use(express.static(path.join(__dirname, '../build')));
app.use(express.static(path.join(__dirname, '../public')));

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Express server is running on http://localhost:${port}/`));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
  console.log('testing...')

});


io.on('connection', (client) => {
  client.on('store-data', (data) => {
    console.log(data);
    // client.emit('timer', (data) => console.log(data));
  });
});