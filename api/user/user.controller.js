import usersService from "../../services/users.service.js";
import { BaseResponse } from "../models/response.js";

const addRoomToUser = async (req, res) => {
  const isSuccess = await usersService.addRoomToUser(
    req.params.userId,
    req.params.roomId
  );

  res
    .status(isSuccess ? 200 : 500)
    .json(
      new BaseResponse(isSuccess, isSuccess ? "" : "Unable to add room to user")
    );
};

const usersController = {
  addRoomToUser,
};

export default usersController;
