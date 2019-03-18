const express = require("express");
const path = require("path");

const app = express();
const port = 6060;
app.use(express.static(path.join(__dirname, "../build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// eslint-disable-next-line no-console
app.listen(port, () =>
  console.log(`Express server is running on http://localhost:${port}/`)
);
