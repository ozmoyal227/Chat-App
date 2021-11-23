import db from "../db-init.js";
import usersService from "./users.service.js";

const Room = db.rooms;
// TODO: Unique id for lobby
const lobbyId = "9e31193e-033e-407e-aa31-5ce304ed5eca";

const addRoom = async (room) => {
  console.log(addRoom.name, "Adding new room", JSON.stringify(room, null, 2));

  try {
    const newRoom = await Room.create(room);

    return {
      id: newRoom.id,
      name: newRoom.name,
    };
  } catch (error) {
    console.error(addRoom.name, "Error creating a new room", error);
    return null;
  }
};

const get = async (id) => {
  console.log(get.name, `Getting room ${id}`);

  try {
    const room = await Room.findByPk(id);
    return room;
  } catch (error) {
    console.error(get.name, "Error getting room", error);
    return null;
  }
};

const addUserToRoom = async (roomId, userId) => {
  console.log(addUserToRoom.name, `Adding user ${userId} to room ${roomId}`);
  try {
    const room = await get(roomId);
    if (!room) {
      console.error(addUserToRoom.name, `Room ${roomId} not found`);
      return null;
    }
    console.log("===== room", JSON.stringify(room, null, 2));

    const userExist = room.users.find((id) => id === userId);
    console.log("===== userExist?", JSON.stringify(userExist, null, 2));
    if (userExist) {
      console.error(addUserToRoom.name, `User is already in room`);
      return;
    }

    const user = await usersService.get(userId);
    if (!user) {
      console.error(addUserToRoom.name, `User ${userId} not found`);
      return null;
    }

    room.users = [...room.users, userId];
    await room.save();
  } catch (error) {
    console.error(addUserToRoom.name, "Error adding user to room", error);
    return null;
  }
};

const createLobbyIfNotExist = async () => {
  console.log(createLobbyIfNotExist.name, "Checking if Lobby exists...");

  try {
    let lobby = await get(lobbyId);

    if (!lobby) {
      console.log(
        createLobbyIfNotExist.name,
        "Lobby does not exist. Creating Lobby..."
      );
      lobby = await Room.create({
        id: lobbyId,
        name: "Lobby",
        users: [],
      });
    }

    await addUserToRoom(lobbyId, "40acae74-fde9-48d6-92ad-52fe704bdc5f");

    console.log("Lobby Room", JSON.stringify(lobby, null, 2));
  } catch (error) {
    const msg = `${createLobbyIfNotExist.name} Error creating Lobby`;
    console.error(msg, error);
    throw new Error(`${msg} ${JSON.stringify(error, null, 2)}`);
  }
};

const roomsService = { addRoom, addUserToRoom, get, createLobbyIfNotExist };

export default roomsService;
