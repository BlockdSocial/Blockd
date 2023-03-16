import { apiCall } from '../../helpers';

const endpoints = {
  message: 'message',
  messages: 'messages',
  chat: 'chat',
  chats: 'chats',
};

async function createMessage(fields: any) {
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

async function createChatroom(fields: any) {
  return apiCall('createChatroom', 'POST', 'user/create/room', fields);
}

async function deleteChatroom(fields: any) {
  return apiCall('deleteChatroom', 'DELETE', `user/delete/room/${fields}`);
};

async function addMember(id: any, fields: any) {
  return apiCall('addMember', 'POST', `add/member/room/${id}`, fields)
};

async function removeMember(id: any, fields: any) {
  return apiCall('removeMember', 'POST', `remove/member/room/${id}`, fields);
};

async function createChatroomMessage(id: any, fields: any) {
  return apiCall('createMessage', 'POST', `message/room/${id}`, fields);
};

async function fetchUserChatrooms() {
  return apiCall('fetchUserChatrooms', 'GET', 'user/fetch/rooms');
};

async function fetchChatroomMembers(fields: any) {
  return apiCall('fetchChatroomMembers', 'GET', `members/room/${fields}`);
};

export default {
  createMessage,
  fetchMessages,
  createChat,
  deleteChat,
  getChat,
  muteChat,
  createChatroom,
  deleteChatroom,
  addMember,
  removeMember,
  createChatroomMessage,
  fetchUserChatrooms,
  fetchChatroomMembers
};
