//================================================================
//This page handles our server app startup and import all other 
//modules required 
//================================================================

//import modules
import "dotenv/config"; //tool for environment variables, using .env file
import express from "express"; //tool for creating server
import path from "path"; //tools for express to locate static files
import { fileURLToPath } from "url"; 
import routes from "./api/index.routes.js"; //import our routs for the server
import db from "./db-init.js"; //import our DB after his configuration 
import roomsService from "./services/rooms.service.js"; //tools needed from our chat room services
import expressLayouts from "express-ejs-layouts"; // tool for express to with with layouts
import session from "express-session"; // import session for express server 
import socketService from "./services/socket.service.js"; //import our socket services
import { Server as SocketIoServer } from "socket.io"; //socket is the tool we will use for transferring information
import * as http from "http"; //import http interfaces for server creating

//define session life span
const oneDay = 1000 * 60 * 60 * 24;

//preparation express static files path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//define port according to environment, development or production
const PORT = process.env.PORT || 3000;

//initialization of server app
const app = express();
const server = http.createServer(app);

//set-up express middleware on app
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

//adding middleware layer of authentication to the app
app.use(function (req, res, next) {
  req.isAuthenticated = () => {
    const session = req.session;
    return session.isAuthenticated;
  };
  next();
});

//set-up server routes
app.use("/", routes);

//run DB
(async () => {
  await db.sequelize.sync(); 
  await roomsService.createLobbyIfNotExist();
})();

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
