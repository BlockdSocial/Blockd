import { apiCall } from '../../helpers';

const endpoints = {
  message: 'message',
  messages: 'messages'
};

async function createMessage(fields: any) {
  return apiCall('createMessage', 'POST', `${endpoints.message}`, fields);
};

async function fetchMessages(fields: any) {
  return apiCall('fetchMessages', 'POST', `${endpoints.messages}`, fields);
};

export default {
  createMessage,
  fetchMessages
};
