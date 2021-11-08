
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server, Socket } = require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT || 3001;
const path = require("path");
const { Console } = require('console');


app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/login.html")); 
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
io.on('connection', (socket) => {
  socket.broadcast.emit('chat-message', 'A user connected');
  
  socket.on('chat-message', (msg) => {
    io.emit('chat-message', msg);
  });
  socket.on('disconnect', () => {
    socket.broadcast.emit('chat-message', 'A user disconnected');
  });
});

// =============
// Server
// =============
server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
