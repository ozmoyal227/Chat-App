import roomsService from "./rooms.service.js";
import { v4 as uuidv4 } from "uuid";

const getChatMessages = async (chatId) => {
  try {
    const room = await roomsService.get(chatId);
    if (!room) {
      console.error(getChatMessages.name, `Chat ${chatId} not found`);
      return false;
    }

    return room.messages;
  } catch (error) {
    console.error(getChatMessages.name, "Error getting chat messages");
    return false;
  }
};

const addMessage = async (chatId, message) => {
  try {
    const room = await roomsService.get(chatId);
    if (!room) {
      console.error(addMessage.name, `Chat ${chatId} not found`);
      return false;
    }

    const newMessage = {
      ...message,
      id: uuidv4(),
      sentAt: new Date(),
    };

    room.messages = [...room.messages, newMessage];

    await room.save();
    return true;
  } catch (error) {
    console.error(addMessage.name, "Error adding message to chat");
    return false;
  }
};

const chatsService = { addMessage, getChatMessages };

export default chatsService;
