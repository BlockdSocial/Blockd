import { apiCall } from '../../helpers';

const endpoints = {
  userNotifications: 'user/notifications',
  userNotification: 'user/notification',
};

async function fetchUserNotifications() {
  return apiCall('fetchUserNotifications', 'GET', `${endpoints.userNotifications}/all`);
};

async function fetchUserNotification(fields: any) {
  console.log('fields',fields)
  return apiCall('fetchUserNotification', 'GET', `${endpoints.userNotification}/${fields}`);
};

async function readNotification(fields: any) {
  return apiCall('readNotification', 'GET', `notification/read/${fields}`);
};

export default {
  fetchUserNotifications,
  fetchUserNotification,
  readNotification
};
