import db from "../db-init.js";
import roomsService from "./rooms.service.js";

const User = db.users;

const addUser = async (user) => {
  console.log(addUser.name, "Adding new user", JSON.stringify(user, null, 2));

  try {
    const { id, name, rooms } = await User.create({
      name: user.name,
      password: user.password,
      rooms: [],
    });

    return { id, name, rooms };
  } catch (error) {
    console.error(
      addUser.name,
      "Error creating a new user",
      JSON.stringify(error, null, 2)
    );
    return null;
  }
};

const addRoomToUser = async (userId, roomId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      console.error(addRoomToUser.name, `User ${userId} not found`);
      return false;
    }

    const roomExist = user.rooms.find((id) => id === roomId);

    if (roomExist) {
      console.error(addRoomToUser.name, `User is already in room`);
      return false;
    }

    const room = await roomsService.get(roomId);
    if (!room) {
      console.error(addRoomToUser.name, `Room ${roomId} not found`);
      return false;
    }

    user.rooms = [...user.rooms, roomId];
    await user.save();
    return true;
  } catch (error) {
    console.error(addRoomToUser.name, "Error adding room to user");
    return false;
  }
};

const get = async (id) => {
  console.log(get.name, `Getting user ${id}`);
  try {
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    console.error(get.name, "Error getting user", error);
    return null;
  }
};

const getByName = async (name) => {
  console.log(get.name, `Getting user by name ${name}`);
  try {
    const user = await User.findOne({ where: { name } });
    return user;
  } catch (error) {
    console.error(get.name, "Error getting user by name", error);
    return null;
  }
};

const usersService = { addUser, addRoomToUser, get, getByName };

export default usersService;
