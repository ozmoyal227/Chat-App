import express from "express";
import chatsController from "./chat.controller.js";
import { isAuthMiddleware } from "../../middleware/auth.middleware.js";
const chatRouter = express.Router();

chatRouter
  /** GET /chats - Get chats page */
  .get("/", isAuthMiddleware, chatsController.getChats);

export default chatRouter;
