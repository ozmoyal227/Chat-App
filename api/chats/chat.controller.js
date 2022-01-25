import moment from "moment";
import chatsService from "../../services/chats.service.js";
import roomsService, { lobbyId } from "../../services/rooms.service.js";
import usersService from "../../services/users.service.js";
import { BaseResponse } from "../models/response.js";

const getChats = async (req, res) => {
  const { userId, username } = req.session;

  const userFiles = await usersService.getUserFiles(userId);
  const lobby = await roomsService.get(lobbyId);
  res.render("chats", {
    layout: "./layouts/main",
    user: {
      id: userId,
      name: username,
      files: userFiles,
    },
    lobby: lobby,
    moment: moment,
    isSupportedPreviewType: (type) => {
      const supportedTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/svg+xml",
      ];
      return !!supportedTypes.find((t) => type === t);
    },
  });
};

const addMessageToChat = async (req, res) => {
  const { message } = req.body;
  const { chatId } = req.params;

  const isSuccess = await chatsService.addMessage(chatId, message);

  res
    .status(isSuccess ? 200 : 500)
    .json(
      new BaseResponse(
        isSuccess,
        isSuccess ? "Message added successfully" : "Error adding message"
      )
    );
};

const chatsController = {
  getChats,
  addMessageToChat,
};

export default chatsController;
