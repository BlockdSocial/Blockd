import { apiCall } from '../../helpers';

const endpoints = {
  user: 'user',
};

async function updateProfilePicture(fields: any) {
  return apiCall('updateProfilePicture', 'POST', `${endpoints.user}/profile/picture`, fields);
};

async function updateProfileBanner(fields: any) {
  return apiCall('updateProfileBanner', 'POST', `${endpoints.user}/profile/banner`, fields);
};

async function fetchFollowers(fields: any) {
  return apiCall('fetchFollowers', 'GET', `${endpoints.user}/followers`, fields);
};

async function fetchFollowings(fields: any) {
  return apiCall('fetchFollowings', 'GET', `${endpoints.user}/followings`, fields);
};

async function updateUser(fields: any) {
  return apiCall('updateUser', 'POST', `${endpoints.user}/reset`, fields);
};

async function fetchUser(fields: any) {
  return apiCall('fetchUser', 'GET', `${endpoints.user}/${fields}`);
};

export default {
  updateProfilePicture,
  updateProfileBanner,
  fetchFollowers,
  fetchFollowings,
  updateUser,
  fetchUser
};
