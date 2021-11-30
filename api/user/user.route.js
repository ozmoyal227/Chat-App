import express from "express";
import usersController from "./user.controller.js";

const userRouter = express.Router();

userRouter
  /** POST /users - Create new user */
  .post("/", usersController.create);

userRouter
  /** POST /users/:userId/rooms/:roomId - Add room to user */
  .post("/:userId/rooms/:roomId", usersController.addRoomToUser);

export default userRouter;
