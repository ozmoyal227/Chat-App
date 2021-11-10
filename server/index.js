const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

const db = require('../config/database');

app.use('/users', require('../routes/users'));

db.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Err: ' + err));

// app.use(express.static(path.resolve(__dirname, "../client/index.html")));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/index.html"));
});
// =============
// API
// =============
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// =============
// Socket IO
// =============

// =============
// Server
// =============
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
