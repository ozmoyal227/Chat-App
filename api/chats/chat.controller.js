// ================================================================
// This page holds functions to chat services
// ================================================================ 

//import moment,related services and response classes
import moment from "moment";
import chatsService from "../../services/chats.service.js";
import roomsService, { lobbyId } from "../../services/rooms.service.js";
import usersService from "../../services/users.service.js";
import { BaseResponse } from "../models/response.js";

//function to render chats login view into main layout
const getChats = async (req, res) => {
  //get user info from session
  const { userId, username } = req.session;

  //get users files
  const userFiles = await usersService.getUserFiles(userId);

  //get lobby
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

//function to add message to chat and update response
const addMessageToChat = async (req, res) => {
  //get message and chat id
  const { message } = req.body;
  const { chatId } = req.params;

  //adding message to chat
  const isSuccess = await chatsService.addMessage(chatId, message);

  //update response status accordingly to message adding
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
