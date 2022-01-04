import db from "../db-init.js";
import roomsService, { lobbyId } from "./rooms.service.js";
import usersService from "./users.service.js";
const User = db.users;

const login = async ({ name, password }) => {
  console.log(login.name, `User ${name} trying to login`);

  try {
    const user = await User.findOne({ where: { name, password } });
    console.log(login.name, `User exists? `, !!user);
    return user.id;
  } catch (error) {
    console.error(login.name, "Error while trying to login user", error);
    return false;
  }
};

const register = async ({ name, password }) => {
  console.log(register.name, `Registering ${name}...`);

  try {
    const isUserExist = !!(await usersService.getByName(name));
    console.log(register.name, `User exists? `, isUserExist);

    if (isUserExist) return false;

    const newUser = await usersService.addUser({
      name,
      password,
    });

    if (!newUser) {
      return false;
    }

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
