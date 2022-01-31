//================================================================
//This page handles our server app startup and import all other 
//modules required 
//================================================================

//import modules
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

//define session life span
const oneDay = 1000 * 60 * 60 * 24;

//preparation epress static files path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//define port according to enviornment, development or production
const PORT = process.env.PORT || 3000;

//initialization of server app
const app = express();
const server = http.createServer(app);

//set-up express middlewares on app
app.use(express.json());
app.use(express.static(__dirname + "/public"));

//set-up express-session on app
app.use(
  session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

//set-up ejs(embedded javascript templates) on app
app.use(expressLayouts);
app.set("view engine", "ejs");

//DB initializition :לא אמור להיות מתחת להגדרת האוטינטיקציה על הסשן?
(async () => {
  await db.sequelize.sync(); 
  await roomsService.createLobbyIfNotExist();
})();

//adding middleware layer of authenthication to the app
app.use(function (req, res, next) {
  req.isAuthenticated = () => {
    const session = req.session;
    return session.isAuthenticated;
  };
  next();
});

//set-up server routes
app.use("/", routes);

//Socket IO initialization
const io = new SocketIoServer(server);

//set-up socket events
const onSocketConnection = (socket) => {
  console.log("a user connected");
  socketService.registerChatHandlers(io, socket); //socket services for chat app
};
io.on("connection", onSocketConnection);

//server start to listen for connections
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}/ `);
});
