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

async function fetchFollowers() {
  return apiCall('fetchFollowers', 'POST', `${endpoints.user}/followers`);
};

async function fetchFollowings() {
  return apiCall('fetchFollowings', 'POST', `${endpoints.user}/followings`);
};

async function updateUser(fields: any) {
  return apiCall('updateUser', 'POST', `${endpoints.user}/reset`, fields);
};

async function fetchUser(fields: any) {
  return apiCall('fetchUser', 'GET', `${endpoints.user}/${fields}`);
};

async function searchUsers(fields: any) {
  return apiCall('searchPopularUsers', 'POST', 'search/users/all', fields);
};

async function followUser(fields: any) {
  return apiCall('followUser', 'POST', `${endpoints.user}/follow`, fields);
};

export default {
  updateProfilePicture,
  updateProfileBanner,
  fetchFollowers,
  fetchFollowings,
  updateUser,
  fetchUser,
  searchUsers,
  followUser
};
