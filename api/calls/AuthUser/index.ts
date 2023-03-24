import { apiCall } from '../../helpers';

const endpoints = {
  authUser: 'user',
  login: 'login',
  logout: 'logout',
};

async function fetchAuthUser() {
  return apiCall('fetchAuthUser', 'GET', endpoints.authUser);
};

async function loginUser(fields: any) {
  return apiCall('loginUser', 'POST', `${endpoints.authUser}/login/wallet`, fields);
};

async function registerUser(fields: any) {
  return apiCall('registerUser', 'POST', `${endpoints.authUser}/register`, fields);
};

async function fetchUserMessage() {
  return apiCall('fetchUserMessage', 'GET', `${endpoints.authUser}/generate/message`);
};

async function logoutUser() {
  return apiCall('logout', 'POST', `${endpoints.authUser}/logout`);
};

async function sendVerification(fields: any) {
  return apiCall('sendVerification', 'POST', `${endpoints.authUser}/verify/email`, fields);
};

export default { 
  fetchAuthUser,
  loginUser,
  logoutUser,
  fetchUserMessage,
  registerUser,
  sendVerification
};
