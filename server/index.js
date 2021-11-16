import "dotenv/config";
import express from "express";
import path from "path";
import db from "./db-init.js";
import roomsService from "./services/rooms.service.js";
import usersService from "./services/users.service.js";
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());

db.sequelize.sync();

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/index.html"));
});

// =============
// API
// =============
const baseRoute = "/api";
app.get(baseRoute, (req, res) => {
  res.json({ message: "Hello from server!" });
});

// POST user
app.post(`${baseRoute}/users`, async (req, res) => {
  const user = await usersService.addUser({
    name: req.body.name,
  });

  res.json(user);
});

// POST room
app.post(`${baseRoute}/rooms`, async (req, res) => {
  const room = await roomsService.addRoom({
    userId: req.body.userId,
    name: req.body.name,
  });

  res.json(room);
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
