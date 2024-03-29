import { apiCall } from '../../helpers';

const endpoints = {
  userNotifications: 'user/notifications',
  userNotification: 'user/notification',
  userMessageNotification: 'user/message-notifications',
 
};

async function fetchUserNotifications() {
  return apiCall('fetchUserNotifications', 'GET', `${endpoints.userNotifications}/all`);
};

async function fetchAllUserNotifications(fields: any) {
  return apiCall('fetchAllUserNotifications', 'POST', `${endpoints.userNotifications}`,fields);
};
async function fetchAllUserMessageNotifications(fields: any) {
  return apiCall('fetchAlMessageUserNotifications', 'POST', `${endpoints.userMessageNotification}`, fields);
};

async function fetchUserNotification(fields: any) {
  return apiCall('fetchUserNotification', 'GET', `${endpoints.userNotification}/${fields}`);
};

async function readNotification(fields: any) {
  return apiCall('readNotification', 'GET', `notification/read/${fields}`);
};

export default {
  fetchUserNotifications,
  fetchAllUserMessageNotifications,
  fetchAllUserNotifications,
  fetchUserNotification,
  readNotification
};
