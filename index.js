// @ts-nocheck
import "dotenv/config";
import express from "express";
import http from "http";
import { Server } from "socket.io";

import path from "path";
import { fileURLToPath } from "url";
import routes from "./api/index.routes.js";
import db from "./db-init.js";
import roomsService from "./services/rooms.service.js";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";


const app = express();
const server = http.createServer(app);
const io = new Server(server);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3001;



app.use(express.json());

const oneDay = 1000 * 60 * 60 * 24;
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

// =============
// API
// =============
app.use("/", routes);

app.use(function (req, res, next) {
  req.isAuthenticated = () => {
    const session = req.session;
    return session.isAuthenticated;
  };
  next();
});

function isAuthMiddleware(req, res, next) {
  req.isAuthenticated() ? next() : res.redirect("/auth/login");
}

app.get("/", (req, res) => {
  res.redirect("/chats");
});

app.get("/main", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../chat-app/index.html"));
});


app.get("/chats", isAuthMiddleware, (req, res) => {
  res.render("chats", {
    layout: "./layouts/main",
  });
});

// =============
// Socket IO
// =============
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
});
// =============
// Server
// =============
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
