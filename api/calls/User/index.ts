import { apiCall } from '../../helpers';

const endpoints = {
  user: 'user',
};

async function updateProfilePicture(fields: any) {
  return apiCall('updateProfilePicture', 'POST', `${endpoints.user}/profile/picture`, fields);
}

async function updateProfileBanner(fields: any) {
  return apiCall('updateProfileBanner', 'POST', `${endpoints.user}/profile/banner`, fields);
}

export default { 
  updateProfilePicture,
  updateProfileBanner
};
