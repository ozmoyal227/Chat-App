// ================================================================
// This page holds authentication routs
// ================================================================ 

//import express for router and authentication controllers
import express from "express";
import authController from "./auth.controller.js";

const authRouter = express.Router();

//set routes for authentication views:

authRouter
  .route("/login")
  .get(authController.getLogin)
  .post(authController.postLogin);

authRouter
  .route("/register")
  .get(authController.getRegister)
  .post(authController.postRegister);

authRouter
  .get("/logout", authController.logout);

export default authRouter;
