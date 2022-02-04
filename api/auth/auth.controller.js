// ================================================================
// This page holds functions to authentication services
// ================================================================ 

//import authentication services and response classes
import authService from "../../services/auth.service.js";
import { Response, BaseResponse } from "../models/response.js";

//function to render login view into authentication layout
const getLogin = async (req, res) => {
  res.render("login", {
    layout: "./layouts/auth",
    title: "Login | Chat",
    card_title: "Login",
  });
};

//function to return response for login post request
const postLogin = async (req, res) => {
  const { name, password } = req.body;

  //if the request missing name or password, return bad request
  if (!name || !password) {
    res
      .status(400)
      .send(new BaseResponse(false, "Invalid username or password"));
    return;
  }

  //get user id from authentication service if exist
  const userId = await authService.login({name,password});

  //update authentication middleware on session
  const session = req.session;
  session.isAuthenticated = !!userId;

  //if user id missing, return unauthorized
  if (!userId) {
    res.status(401).send();
    return;
  }

  //update session user info
  session.userId = userId;
  session.username = name;

  //redirect to base route after session updated
  res.redirect("/");
};

//function to render register view into authentication layout
const getRegister = (req, res) => {
  res.render("register", {
    layout: "./layouts/auth",
    title: "Register | Chat",
    card_title: "Register",
  });
};

//function to return response for register post request
const postRegister = async (req, res) => {
  const { name, password } = req.body;

  //if the request missing name or password, return bad request
  if (!name || !password) {
    res
      .status(400)
      .send(new BaseResponse(false, "Invalid username or password"));
    return;
  }

  //check if registered successfully
  const isSuccess = await authService.register({
    name,
    password,
  });

  if (!isSuccess) {
    res.status(500).send();
    return;
  }

  //redirect login route after successful register 
  res.redirect("/auth/login");
};

//function for logout
const logout = (req, res) => {
  //terminate session and redirect to base route
  req.session.destroy();
  res.redirect("/");
};

const authController = {
  getLogin,
  postLogin,
  getRegister,
  postRegister,
  logout,
};

export default authController;
