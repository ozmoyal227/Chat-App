const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static(path.resolve(__dirname, "../client/build")));

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
