import roomsService from "../../services/rooms.service.js";

const create = async (req, res) => {
  const room = await roomsService.addRoom({
    name: req.body.name,
  });

  res.json(room);
};

const addUserToRoom = async (req, res) => {
  const isSuccess = await roomsService.addUserToRoom(
    req.params.roomId,
    req.params.userId
  );

  if (!isSuccess) {
    res.status(500).json({
      success: false,
      message: "Error adding user to room",
    });
    return;
  }

  res.json({
    success: isSuccess,
  });
};

const usersController = {
  create,
  addUserToRoom,
};

export default usersController;
