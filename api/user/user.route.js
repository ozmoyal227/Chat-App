import express from "express";
import usersController from "./user.controller.js";

const userRouter = express.Router();

userRouter
  /** POST /users/:userId/rooms/:roomId - Add room to user */
  .post("/:userId/rooms/:roomId", usersController.addRoomToUser);

userRouter
  /** POST /users/files - Add file to user */
  .post("/files", usersController.addFileToUser);

export default userRouter;
