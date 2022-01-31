import chatsService from "./chats.service.js";

const registerChatHandlers = (io, socket) => {
  const addMessage = async (message, chatId, callback) => {
    let newMessage = null;
    try {
      if (!chatId || !message) {
        return;
      }

      newMessage = await chatsService.addMessage(chatId, message);

      // If message added successfully to the DB,
      // Emit the added message to clients
      if (newMessage) {
        io.emit("message:add", newMessage);
      }
    } catch (error) {
      console.error("Error sending message", error);
    } finally {
      if (callback) callback(newMessage);
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
