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
  return apiCall('fetchFollowers', 'POST', `${endpoints.user}/followers/${fields}`);
};

async function fetchFollowings(fields: any) {
  return apiCall('fetchFollowings', 'POST', `${endpoints.user}/followings/${fields}`);
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

async function fetchUserRewards() {
  return apiCall('fetchUserRewards', 'GET', `${endpoints.user}/rewards/display`);
};

async function setUserFrame(fields: any) {
  return apiCall('setUserFrame', 'POST', `${endpoints.user}/frame/${fields}`);
};

async function isFollowed(fields: any) {
  return apiCall('isFollowed', 'GET', `${endpoints.user}/followed/${fields}`);
};

async function resetBell() {
  return apiCall('resetBell', 'GET', `${endpoints.user}/reset/bell`);
};

async function resetMessages() {
  return apiCall('resetMessages', 'GET', `${endpoints.user}/reset/messages/bell`);
};

async function searchFilteredUsers(fields: any) {
  return apiCall('searchFilteredUsers', 'POST', 'search/users', fields);
};

async function checkEmail(fields: any) {
  return apiCall('checkEmail', 'POST', `email/taken/check`, fields)
};

async function searchTagUsers(fields: any) {
  return apiCall('searchTagUsers', 'POST', 'tag/users', fields);
};

async function searchTagParticipants(id: any, fields: any) {
  return apiCall('searchTagParticipants', 'POST', `tag/participants/${id}`, fields);
};

export default {
  updateProfilePicture,
  updateProfileBanner,
  fetchFollowers,
  fetchFollowings,
  updateUser,
  fetchUser,
  searchUsers,
  followUser,
  fetchUserRewards,
  setUserFrame,
  isFollowed,
  resetBell,
  resetMessages,
  searchFilteredUsers,
  checkEmail,
  searchTagUsers,
  searchTagParticipants
};
