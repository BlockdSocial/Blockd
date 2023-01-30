

import { apiCall } from '../../helpers';

const endpoints = {
  post: 'post',
};

async function createPost(fields: any) {
  return apiCall('createPost', 'POST', endpoints.post, fields);
}

async function deletePost(fields: any) {
  return apiCall('deletePost', 'DELETE', `${endpoints.post}/${fields}`);
}

export default {
  createPost,
  deletePost
};
