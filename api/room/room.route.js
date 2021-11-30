import express from "express";
import roomsController from "./room.controller.js";

const roomRouter = express.Router();

roomRouter
  /** POST /rooms - Create new room */
  .post("/", roomsController.create);

roomRouter
  /** POST /rooms/:roomId/users/:userId - Add user to room */
  .post("/:roomId/users/:userId", roomsController.addUserToRoom);

export default roomRouter;
