import chatsService from "./chats.service.js";

const registerChatHandlers = (io, socket) => {
  const addMessage = async (message, chatId, callback) => {
    let isSuccess = false;
    try {
      if (!chatId || !message) {
        return;
      }

      isSuccess = await chatsService.addMessage(chatId, message);

      if (isSuccess) {
        socket.emit("message:add", message);
      }
    } finally {
      if (callback) callback(isSuccess);
    }
  };

  const joinChat = (chatId) => {
    socket.join(chatId);
  };

  socket.on("message:add", addMessage);
  socket.on("chat:join", joinChat);
};

const socketService = { registerChatHandlers };

export default socketService;
