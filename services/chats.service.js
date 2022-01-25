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
      return null;
    }

    const { senderId, senderName, text, file } = message;

    const newFile =
      file && file.name
        ? {
            id: uuidv4(),
            name: file.name,
            type: file.type,
            data: file.data,
          }
        : null;

    const newMessage = {
      id: uuidv4(),
      sentAt: new Date(),
      senderId: senderId,
      senderName: senderName,
      text: text,
      file: newFile,
    };

    room.messages = [...room.messages, newMessage];

    await room.save();

    return newMessage;
  } catch (error) {
    console.error(addMessage.name, "Error adding message to chat", error);
    return null;
  }
};

const chatsService = { addMessage, getChatMessages };

export default chatsService;
