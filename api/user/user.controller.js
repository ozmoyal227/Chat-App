import usersService from "../../services/users.service.js";
import { BaseResponse, Response } from "../models/response.js";

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

const removeFileFromUser = async (req, res) => {
  const { fileId } = req.params;

  const { userId } = req.session;

  if (!userId) {
    res.status(401).send();
  }

  if (!fileId) {
    res.status(400).json(new BaseResponse(false, "Invalid fileId"));
  }

  const isSuccess = await usersService.removeFileFromUser(userId, fileId);

  res
    .status(isSuccess ? 200 : 500)
    .json(
      new BaseResponse(
        isSuccess,
        isSuccess ? "" : "Unable to remove file from user"
      )
    );
};

const getUserFiles = async (req, res) => {
  const { userId } = req.session;

  const userFiles = await usersService.getUserFiles(userId);

  res
    .status(!!userFiles ? 200 : 500)
    .json(new Response(userFiles?.length >= 0, userFiles ?? undefined));
};

const usersController = {
  addRoomToUser,
  addFileToUser,
  removeFileFromUser,
  getUserFiles,
};

export default usersController;
