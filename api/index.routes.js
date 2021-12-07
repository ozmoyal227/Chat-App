import express from "express";
import userRouter from "./user/user.route.js";
import roomRouter from "./room/room.route.js";
import authRouter from "./auth/auth.route.js";

const routes = express.Router();

routes.use("/auth", authRouter);
routes.use("/users", userRouter);
routes.use("/rooms", roomRouter);

export default routes;
