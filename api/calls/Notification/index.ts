import { apiCall } from '../../helpers';

const endpoints = {
  userNotifications: 'user/notifications',
};

async function fetchUserNotifications(fields: any) {
  return apiCall('fetchUserNotifications', 'GET', endpoints.userNotifications, fields);
};

async function fetchUserNotification(fields: any) {
  return apiCall('fetchUserNotification', 'GET', `${endpoints.userNotifications}/${fields}`);
};

export default {
  fetchUserNotifications,
  fetchUserNotification
};
