// @ts-nocheck
import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./api/index.routes.js";
import db from "./db-init.js";
import roomsService from "./services/rooms.service.js";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import socketService from "./services/socket.service.js";
import { Server as SocketIoServer } from "socket.io";
import * as http from "http";

const oneDay = 1000 * 60 * 60 * 24;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.use(
  session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

app.use(expressLayouts);
app.set("view engine", "ejs");

// =============
// DB INIT
// =============
(async () => {
  await db.sequelize.sync();
  await roomsService.createLobbyIfNotExist();
})();

app.use(function (req, res, next) {
  req.isAuthenticated = () => {
    const session = req.session;
    return session.isAuthenticated;
  };
  next();
});

app.use("/", routes);

// =============
// Socket IO
// =============
const io = new SocketIoServer(server);
const onSocketConnection = (socket) => {
  console.log("a user connected");
  socketService.registerChatHandlers(io, socket);
};
io.on("connection", onSocketConnection);

// io.on("connection", (socket) => {
//   console.log("a user connected");

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });

//   socket.on("connect_error", (err) => {
//     console.log(`connect_error due to ${err.message}`);
//   });
// });

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}/ `);
});
