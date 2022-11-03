// ================================================================
// This page holds room routs, in future versions will be used for rooms beside lobby
// ================================================================

//import express for router and room controllers
import express from "express";
import roomsController from "./room.controller.js";

const roomRouter = express.Router();

//set routes for room controller:

roomRouter
  //create new room 
  .post("/", roomsController.create);

roomRouter
  //add user to room 
  .post("/:roomId/users/:userId", roomsController.addUserToRoom);

export default roomRouter;
