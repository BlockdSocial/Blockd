import { apiCall } from '../../helpers';

const endpoints = {
  comment: 'comment',
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

export default {
  addComment,
  deleteComment,
  likeComment
};
