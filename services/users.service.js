// ================================================================
// This page performs authentication actions
// ================================================================ 

//import DB and room services
import db from "../db-init.js";
import roomsService from "./rooms.service.js";

//bringing User table
const User = db.users;

//function to add user to User table, returning his properties
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

//function for adding room to user
const addRoomToUser = async (userId, roomId) => {
  try {
    //checking if user exist
    const user = await User.findByPk(userId);
    if (!user) {
      console.error(addRoomToUser.name, `User ${userId} not found`);
      return false;
    }

    //checking if room exist
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

    //adding room to user and save the table
    user.rooms = [...user.rooms, roomId];
    await user.save();
    return true;
  } catch (error) {
    console.error(addRoomToUser.name, "Error adding room to user");
    return false;
  }
};

//function to get user by id
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

//function to get user by name
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

//function for adding file to user
const addFileToUser = async (userId, fileToAdd) => {
  console.log(
    addFileToUser.name,
    `Trying to add file ${fileToAdd?.id} to user ${userId}`
  );

  //checking if inputs are proper
  if (!userId || !fileToAdd || !fileToAdd.id) {
    console.error(
      addFileToUser.name,
      `Cant add file if invalid user or file received`
    );
    return false;
  }

  try {
    //checking if user exist
    const user = await User.findByPk(userId);
    if (!user) {
      console.error(addFileToUser.name, `User ${userId} not found`);
      return false;
    }

    let isFileExists = false;

    if (user.files) {
      //checking if file already exist
      isFileExists = user.files.some(
        (userFile) => userFile.id === fileToAdd.id
      );
    }

    if (isFileExists) {
      console.error(addFileToUser.name, `File already exists on user`);
      return false;
    }

    //adding file to user and save the table
    user.files = [...user.files, fileToAdd];
    await user.save();
    return true;
  } catch (error) {
    console.error(addFileToUser.name, "Error adding file to user", error);
    return false;
  }
};

//function for removing file from user
const removeFileFromUser = async (userId, fileId) => {
  console.log(
    removeFileFromUser.name,
    `Trying to remove file ${fileId} from user ${userId}`
  );

  //checking if inputs are proper
  if (!userId || !fileId) {
    console.error(
      removeFileFromUser.name,
      `Cant remove file if invalid user or fileId received`
    );
    return false;
  }

  try {
    //checking is user exist
    const user = await User.findByPk(userId);
    if (!user) {
      console.error(removeFileFromUser.name, `User ${userId} not found`);
      return false;
    }

    //update user files to be without the desired file, and save table
    user.files = user.files?.filter((f) => f.id !== fileId);
    await user.save();
    return true;
  } catch (error) {
    console.error(
      removeFileFromUser.name,
      "Error removing file from user",
      error
    );
    return false;
  }
};

//function to get user files
const getUserFiles = async (userId) => {
  console.log(getUserFiles.name, `Getting user ${userId} files`);
  try {
    //checking is user exist, return his files
    const user = await User.findByPk(userId);
    return user.files || [];
  } catch (error) {
    console.error(getUserFiles.name, "Error getting user files", error);
    return null;
  }
};

const usersService = {
  addUser,
  addRoomToUser,
  get,
  getByName,
  addFileToUser,
  removeFileFromUser,
  getUserFiles,
};

export default usersService;
