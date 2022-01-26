import express from "express";
import usersController from "./user.controller.js";

const userRouter = express.Router();

userRouter
  /** POST /users/:userId/rooms/:roomId - Add room to user */
  .post("/:userId/rooms/:roomId", usersController.addRoomToUser);

userRouter
  /** GET /users/files - Get user files */
  .get("/files", usersController.getUserFiles);

userRouter
  /** POST /users/files - Add file to user */
  .post("/files", usersController.addFileToUser);

userRouter
  /** DELETE /users/file/:fileId - Remove file from user */
  .delete("/files/:fileId", usersController.removeFileFromUser);

export default userRouter;
