import authService from "../../services/auth.service.js";
import { BaseResponse } from "../models/response.js";

const login = async (req, res) => {
  const isSuccess = await authService.login({
    name: req.body.name,
    password: req.body.password,
  });

  res
    .status(isSuccess ? 200 : 400)
    .json(
      new BaseResponse(
        isSuccess,
        isSuccess ? "" : "Invalid username or password"
      )
    );
};

const register = async (req, res) => {
  const isSuccess = await authService.register({
    name: req.body.name,
    password: req.body.password,
  });

  res
    .status(isSuccess ? 200 : 400)
    .json(
      new BaseResponse(isSuccess, isSuccess ? "" : "Unable to register user")
    );
};

const authController = {
  login,
  register,
};

export default authController;
