import "dotenv/config";
import express from "express";
import path from "path";
import routes from "./api/index.routes.js";
import db from "./db-init.js";
import roomsService from "./services/rooms.service.js";
import usersService from "./services/users.service.js";
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());

// =============
// DB INIT
// =============
(async () => {
  await db.sequelize.sync();
  await roomsService.createLobbyIfNotExist();
})();

// =============
// API
// =============
// mount all routes on /api path
app.use("/api", routes);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/index.html"));
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
