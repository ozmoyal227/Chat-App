// @ts-nocheck
import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./api/index.routes.js";
import db from "./db-init.js";
import roomsService from "./services/rooms.service.js";
import expressLayouts from "express-ejs-layouts";
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use("/api", routes);

app.get("/login", (req, res) => {
  res.render("login", { title: "Login | Chat" , card_title: "Sign in"});
});

app.get("/register", (req, res) => {
  res.render("register", { title: "Register | Chat", card_title: "Register" });
});

// app.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../client/index.html"));
// });

// =============
// Socket IO
// =============

// =============
// Server
// =============
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
