

import { apiCall } from '../../helpers';

const endpoints = {
  post: 'post',
  posts: 'posts',
  like: 'like',
  dislike: 'dislike',
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

async function dislikePost(fields: any) {
  return apiCall('dislikePost', 'POST', endpoints.dislike, fields);
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

async function fetchPost(fields: any) {
  return apiCall('fetchPost', 'GET', `${endpoints.post}/${fields}`);
};

async function fetchPostImage(fields: any) {
  return apiCall('fetchPostImage', 'GET', `${endpoints.post}/image/${fields}`);
};

async function fetchPostInfo(fields: any) {
  return apiCall('fetchPostInfo', 'GET', `${endpoints.post}/info/${fields}`);
};

async function fetchUserPosts(fields: any) {
  return apiCall('fetchUserPosts', 'GET', `${endpoints.post}/user/${fields}`);
};

export default {
  createPost,
  deletePost,
  likePost,
  searchPosts,
  fetchTrendingPosts,
  fetchFilteredPosts,
  fetchPost,
  fetchPostImage,
  fetchPostInfo,
  fetchUserPosts,
  dislikePost
};
