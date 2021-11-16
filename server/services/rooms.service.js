import db from "../db-init.js";

const Room = db.rooms;

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

export const roomsService = { addRoom };

export default roomsService;
