// ================================================================
// This page performs chat actions
// ================================================================ 

//import room services and unique id creator
import roomsService from "./rooms.service.js";
import { v4 as uuidv4 } from "uuid";

//function to get chat messages 
const getChatMessages = async (chatId) => {
  try {
    //get room if existed
    const room = await roomsService.get(chatId);
    if (!room) {
      console.error(getChatMessages.name, `Chat ${chatId} not found`);
      return false;
    }

    //return room messages
    return room.messages;
  } catch (error) {
    console.error(getChatMessages.name, "Error getting chat messages");
    return false;
  }
};

//function for adding message to room, then return the message added
const addMessage = async (chatId, message) => {
  try {
    //get room if existed
    const room = await roomsService.get(chatId);
    if (!room) {
      console.error(addMessage.name, `Chat ${chatId} not found`);
      return null;
    }

    //construct a new message from given message:

    const { senderId, senderName, text, file } = message;
    //if the message holds a file, create new file from it
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

    //add message to room messages
    room.messages = [...room.messages, newMessage];

    //save room table after changes
    await room.save();

    return newMessage;
  } catch (error) {
    console.error(addMessage.name, "Error adding message to chat", error);
    return null;
  }
};

const chatsService = { addMessage, getChatMessages };

export default chatsService;
