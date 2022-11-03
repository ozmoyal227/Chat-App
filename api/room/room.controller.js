// ================================================================
// This page holds functions to room services
// ================================================================ 

//import room services and response classes
import roomsService from "../../services/rooms.service.js";
import { BaseResponse, Response } from "../models/response.js";

//function to create new room and update the response
const create = async (req, res) => {
  const room = await roomsService.addRoom({
    name: req.body.name,
  });

  res
    .status(room ? 200 : 500)
    .json(new Response(!!room, room, room ? "" : "Unable to add room"));
};

//function to add user to room and update the response
const addUserToRoom = async (req, res) => {
  const isSuccess = await roomsService.addUserToRoom(
    req.params.roomId,
    req.params.userId
  );

  res
    .status(isSuccess ? 200 : 500)
    .json(
      new BaseResponse(isSuccess, isSuccess ? "" : "Unable to add user to room")
    );
};

const usersController = {
  create,
  addUserToRoom,
};

export default usersController;
