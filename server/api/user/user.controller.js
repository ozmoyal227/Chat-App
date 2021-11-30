import usersService from "../../services/users.service.js";

const create = async (req, res) => {
  const user = await usersService.addUser({
    name: req.body.name,
  });

  res.json(user);
};

const addRoomToUser = async (req, res) => {
  const isSuccess = await usersService.addRoomToUser(
    req.params.userId,
    req.params.roomId
  );

  if (!isSuccess) {
    res.status(500).json({
      success: false,
      message: "Error adding room to user",
    });
  }

  res.json({
    success: isSuccess,
  });
};

const usersController = {
  create,
  addRoomToUser,
};

export default usersController;
