import { apiCall } from '../../helpers';

const endpoints = {
  message: 'message',
  messages: 'messages',
  chat: 'chat',
  chats: 'chats',
};

async function createMessage(fields: any) {
  console.log('createMessage hussein',fields);
  return apiCall('createMessage', 'POST', `${endpoints.message}`, fields);
};

async function fetchMessages(fields: any) {
  return apiCall('fetchMessages', 'POST', `${endpoints.messages}`, fields);
};

async function createChat(fields: any) {
  return apiCall('createChat', 'POST', `${endpoints.chat}/${fields}`);
};

async function deleteChat(fields: any) {
  return apiCall('deleteChat', 'DELETE', `${endpoints.chat}/${fields}`);
};

async function getChat() {
  return apiCall('getChat', 'GET', `${endpoints.chats}`);
};

async function muteChat(fields: any) {
  return apiCall('muteChat', 'POST', `${endpoints.chat}/mute/${fields}`);
};

export default {
  createMessage,
  fetchMessages,
  createChat,
  deleteChat,
  getChat,
  muteChat
};
