// ================================================================
// This page performs socket actions
// ================================================================

//import chat services
import chatsService from "./chats.service.js";

//chat handlers for socket events
const registerChatHandlers = (io, socket) => {

  //function to add message to chat 
  const addMessage = async (message, chatId, callback) => {
    let newMessage = null;
    try {
      if (!chatId || !message) {
        return;
      }

      newMessage = await chatsService.addMessage(chatId, message);

      //if message added successfully to DB,
      //emit the added message to clients
      if (newMessage) {
        io.emit("message:add", newMessage);
      }
    } catch (error) {
      console.error("Error sending message", error);
    } finally {
      if (callback) callback(newMessage);
    }
  };

  //function to join chat room
  const joinChat = (chatId) => {
    socket.join(chatId);
  };

  //defining socket events listener 
  socket.on("message:add", addMessage);
  socket.on("chat:join", joinChat);
};

const socketService = { registerChatHandlers };

export default socketService;
