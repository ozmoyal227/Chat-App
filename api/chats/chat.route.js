import express from "express";
import chatsController from "./chat.controller.js";
import { isAuthMiddleware } from "../../middleware/auth.middleware.js";
const chatRouter = express.Router();

chatRouter
  /** GET /chats - Get chats page */
  .get("/", isAuthMiddleware, chatsController.getChats);

chatRouter
  /** POST /chats - Add message to chat */
  .get("/", isAuthMiddleware, chatsController.getChats);

chatRouter
  /** POST /chats/:chatId/messages - Add message to chat */
  .post("/:chatId/messages", chatsController.addMessageToChat);

export default chatRouter;
