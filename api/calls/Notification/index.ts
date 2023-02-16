import { apiCall } from '../../helpers';

const endpoints = {
  userNotifications: 'user/notifications',
};

async function fetchUserNotifications() {
  return apiCall('fetchUserNotifications', 'GET', `${endpoints.userNotifications}/all`);
};

async function fetchUserNotification(fields: any) {
  return apiCall('fetchUserNotification', 'GET', `${endpoints.userNotifications}/${fields}`);
};

async function readNotification(fields: any) {
  return apiCall('readNotification', 'GET', `notification/read/${fields}`);
};

export default {
  fetchUserNotifications,
  fetchUserNotification,
  readNotification
};
