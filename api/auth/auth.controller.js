import authService from "../../services/auth.service.js";
import { Response, BaseResponse } from "../models/response.js";

const getLogin = async (req, res) => {
  res.render("login", {
    layout: "./layouts/auth",
    title: "Login | Chat",
    card_title: "Login",
  });
};

const postLogin = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    res
      .status(400)
      .send(new BaseResponse(false, "Invalid username or password"));
    return;
  }

  const userId = await authService.login({
    name,
    password,
  });

  const session = req.session;
  session.userId = userId;
  session.isAuthenticated = !!userId;
  session.username = name;

  if (userId) {
    res.redirect("/");
    return;
  }

  res.status(401).send();
};

const getRegister = (req, res) => {
  res.render("register", {
    layout: "./layouts/auth",
    title: "Register | Chat",
    card_title: "Register",
  });
};

const postRegister = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    res
      .status(400)
      .send(new BaseResponse(false, "Invalid username or password"));
    return;
  }

  const isSuccess = await authService.register({
    name,
    password,
  });

  if (!isSuccess) {
    res.status(500).send();
    return;
  }

  res.redirect("/auth/login");
};

const logout = (req, res) => {
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
