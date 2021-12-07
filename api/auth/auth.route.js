import express from "express";
import authController from "./auth.controller.js";

const authRouter = express.Router();

authRouter
  /** POST /login - login a user */
  .post("/login", authController.login);

authRouter
  /** POST /register - register a new user */
  .post("/register", authController.register);

export default authRouter;
