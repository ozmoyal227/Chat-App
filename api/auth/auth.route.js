import express from "express";
import authController from "./auth.controller.js";

const authRouter = express.Router();

authRouter
  .route("/login")
  .get(authController.getLogin)
  .post(authController.postLogin);

authRouter
  .route("/register")
  .get(authController.getRegister)
  .post(authController.postRegister);

authRouter.get("/logout", authController.logout);

export default authRouter;
