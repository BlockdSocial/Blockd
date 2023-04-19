

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

async function fetchUserPosts(id: any, fields: any) {
  return apiCall('fetchUserPosts', 'POST', `${endpoints.post}/user/${id}`, fields);
};

async function fetchIsLiked(fields: any) {
  return apiCall('fetchIsLiked', 'GET', `${endpoints.like}/check/${fields}`);
};

async function fetchIsDisliked(fields: any) {
  return apiCall('fetchIsLiked', 'GET', `${endpoints.dislike}/check/${fields}`);
};

async function addPostView(fields: any) {
  return apiCall('addPostView', 'POST', `${endpoints.post}/view/${fields}`);
};

async function editPost(id: any, fields: any) {
  return apiCall('editPost', 'POST', `${endpoints.post}/${id}`, fields)
};

async function postSuggestion(fields: any) {
  return apiCall('postSuggestion', 'POST', 'user/feedback', fields);
};

async function sharePost(fields: any) {
  return apiCall('sharePost', 'POST', 'share', fields);
};

async function createSuggestion(fields: any) {
  return apiCall('createSuggestion', 'POST', 'user/create/suggestion', fields);
};

async function fetchSuggestions() {
  return apiCall('fetchSuggestions', 'GET', 'suggestions/fetch/all');
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
  dislikePost,
  fetchIsLiked,
  fetchIsDisliked,
  addPostView,
  editPost,
  postSuggestion,
  sharePost,
  createSuggestion,
  fetchSuggestions
};
