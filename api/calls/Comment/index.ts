import { apiCall } from '../../helpers';

const endpoints = {
  comment: 'comment',
  comments: 'comments'
};

async function addComment(fields: any) {
  return apiCall('addComment', 'POST', endpoints.comment, fields);
};

async function deleteComment(fields: any) {
  return apiCall('deleteComment', 'DELETE', `${endpoints.comment}/${fields}`);
};

async function likeComment(fields: any) {
  return apiCall('likeComment', 'POST', `${endpoints.comment}/like`, fields);
};

async function dislikeComment(fields: any) {
  return apiCall('dislikeComment', 'POST', `${endpoints.comment}/dislike`, fields);
};

async function fetchPostComments(fields: any) {
  return apiCall('fetchPostComments', 'GET',  `${endpoints.comments}/post/${fields}`);
};

async function fetchCommentInfo(fields: any) {
  return apiCall('fetchCommentInfo', 'GET', `${endpoints.comment}/info/${fields}`);
};

async function fetchIsLikedComment(fields: any) {
  return apiCall('fetchIsLikedComment', 'GET', `${endpoints.comment}/check/liked/${fields}`);
};

async function fetchIsDislikedComment(fields: any) {
  return apiCall('fetchIsDislikedComment', 'GET', `${endpoints.comment}/check/disliked/${fields}`)
};

export default {
  addComment,
  deleteComment,
  likeComment,
  fetchPostComments,
  fetchCommentInfo,
  fetchIsLikedComment,
  fetchIsDislikedComment,
  dislikeComment
};
