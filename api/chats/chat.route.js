// ================================================================
// This page holds chat routs
// ================================================================ 

//import express for router, chat controllers and authentication middleware
import express from "express";
import chatsController from "./chat.controller.js";
import { isAuthMiddleware } from "../../middleware/auth.middleware.js";

const chatRouter = express.Router();

//set get router chat view
chatRouter.get("/", isAuthMiddleware, chatsController.getChats);

export default chatRouter;
