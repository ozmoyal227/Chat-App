// ================================================================
// This page performs authentication actions
// ================================================================ 

//import DB and related services
import db from "../db-init.js";
import roomsService, { lobbyId } from "./rooms.service.js";
import usersService from "./users.service.js";

//bringing User table
const User = db.users;

//function to get user id for user who try to login
const login = async ({ name, password }) => {
  console.log(login.name, `User ${name} trying to login`);

  try {
    //table search for user
    const user = await User.findOne({ where: { name, password } });
    console.log(login.name, `User exists? `, !!user);
    return user.id;
  } catch (error) {
    console.error(login.name, "Error while trying to login user", error);
    return false;
  }
};

//function to register a new user, returning value depending on success
const register = async ({ name, password }) => {
  console.log(register.name, `Registering ${name}...`);

  try {
    //checking if the user name already taken 
    const isUserExist = !!(await usersService.getByName(name));
    console.log(register.name, `User exists? `, isUserExist);

    if (isUserExist) return false;

    //creating new user
    const newUser = await usersService.addUser({
      name,
      password,
    });

    //checking the creation success
    if (!newUser) {
      return false;
    }

    //adding new user to lobby
    const isSuccess = roomsService.addUserToRoom(lobbyId, newUser.id);

    return isSuccess;
  } catch (error) {
    console.error(register.name, "Error while trying to register user", error);
    return false;
  }
};

const authService = {
  login,
  register,
};

export default authService;
