

import { apiCall } from '../../helpers';

const endpoints = {
  post: 'post',
  posts: 'posts',
  like: 'like',
  search: 'search'
};

async function createPost(fields: any) {
  return apiCall('createPost', 'POST', endpoints.post, fields);
};

async function deletePost(fields: any) {
  return apiCall('deletePost', 'DELETE', `${endpoints.post}/${fields}`);
};

async function likePost(fields: any) {
  return apiCall('likePost', 'POST', endpoints.like, fields);
};

async function searchPosts(fields: any) {
  return apiCall('searchPost', 'POST', `${endpoints.search}/${endpoints.posts}`, fields);
};

async function fetchTrendingPosts() {
  return apiCall('fetchTrendingPosts', 'GET', `${endpoints.posts}/trending`);
};

async function fetchFilteredPosts(fields: any) {
  return apiCall('fetchFilteredPosts', 'POST', `${endpoints.posts}/filtered`, fields);
};

export default {
  createPost,
  deletePost,
  likePost,
  searchPosts,
  fetchTrendingPosts,
  fetchFilteredPosts
};
