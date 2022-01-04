import moment from "moment";
import roomsService, { lobbyId } from "../../services/rooms.service.js";

const getChats = async (req, res) => {
  const { userId, username } = req.session;
  const lobby = await roomsService.get(lobbyId);
  res.render("chats", {
    layout: "./layouts/main",
    user: {
      id: userId,
      name: username,
    },
    lobby: lobby,
    moment: moment,
    authUserId: userId,
  });
};

const chatsController = {
  getChats,
};

export default chatsController;
