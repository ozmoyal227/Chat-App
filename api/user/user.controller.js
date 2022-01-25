import usersService from "../../services/users.service.js";
import { BaseResponse } from "../models/response.js";

const addRoomToUser = async (req, res) => {
  const { userId, roomId } = req.params;
  const isSuccess = await usersService.addRoomToUser(userId, roomId);

  res
    .status(isSuccess ? 200 : 500)
    .json(
      new BaseResponse(isSuccess, isSuccess ? "" : "Unable to add room to user")
    );
};

const addFileToUser = async (req, res) => {
  const { id, name, type, data } = req.body;

  const { userId } = req.session;

  if (!userId) {
    res.status(401).send();
  }

  if (!name || !type) {
    res.status(400).json(new BaseResponse(false, "Invalid file received"));
  }

  const isSuccess = await usersService.addFileToUser(userId, {
    id,
    name,
    type,
    data,
  });

  res
    .status(isSuccess ? 200 : 500)
    .json(
      new BaseResponse(isSuccess, isSuccess ? "" : "Unable to add file to user")
    );
};

const usersController = {
  addRoomToUser,
  addFileToUser,
};

export default usersController;
