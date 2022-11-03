// ================================================================
// This page holds user routs
// ================================================================ 

//import express for router and user controllers
import express from "express";
import usersController from "./user.controller.js";

const userRouter = express.Router();

//set routes for user controllers:

userRouter
  //add room to user 
  .post("/:userId/rooms/:roomId", usersController.addRoomToUser);

userRouter
  //get user files 
  .get("/files", usersController.getUserFiles);

userRouter
  //add file to user 
  .post("/files", usersController.addFileToUser);

userRouter
  //remove file from user
  .delete("/files/:fileId", usersController.removeFileFromUser);

export default userRouter;
