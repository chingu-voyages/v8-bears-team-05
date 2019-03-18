const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// eslint-disable-next-line no-console
app.listen(3001, () => console.log('Express server is running on http://localhost:3001/'));
