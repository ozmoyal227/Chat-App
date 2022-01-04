import express from "express";
import userRouter from "./user/user.route.js";
import roomRouter from "./room/room.route.js";
import authRouter from "./auth/auth.route.js";
import chatRouter from "./chats/chat.route.js";

const routes = express.Router();

routes.get("/", (req, res) => {
  res.redirect("/chats");
});

routes.use("/auth", authRouter);
routes.use("/users", userRouter);
routes.use("/rooms", roomRouter);
routes.use("/chats", chatRouter);

export default routes;
