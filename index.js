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
import chatsService from "./services/chats.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3001;
const app = express();
const oneDay = 1000 * 60 * 60 * 24;

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

app.post("/message", async (req, res) => {
  const { roomId, message } = req.body;
  const isSuccess = await chatsService.addMessage(roomId, message);

  if (!isSuccess) {
    res.status(500).json({ message: "Failure" });
    return;
  }

  res.json({ message: "Success" });
});

// =============
// Socket IO
// =============

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}/ `);
});
