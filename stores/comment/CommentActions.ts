import {
  IS_ADDING_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  IS_DELETING_COMMENT,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  IS_LIKING_COMMENT,
  LIKE_COMMENT_SUCCESS,
  LIKE_COMMENT_FAILURE,
  IS_FETCHING_POST_COMMENTS,
  FETCH_POST_COMMENTS_SUCCESS,
  FETCH_POST_COMMENTS_FAILURE,
  IS_FETCHING_COMMENT_INFO,
  FETCH_COMMENT_INFO_SUCCESS,
  FETCH_COMMENT_INFO_FAILURE
} from './CommentActionTypes';

// Api
import { commentApi } from '../../api';

export function addComment(fields: object) {
  return async (dispatch: any) => {
    dispatch({ type: IS_ADDING_COMMENT });
    try {
      await commentApi.addComment(fields);
      dispatch({ type: ADD_COMMENT_SUCCESS });
    } catch (error: any) {
      console.log('Add comment error: ', error);
      dispatch({
        type: ADD_COMMENT_FAILURE,
        error: error
      });
    }
  }
}

export function deleteComment(fields: object) {
  return async (dispatch: any) => {
    dispatch({ type: IS_DELETING_COMMENT });
    try {
      await commentApi.deleteComment(fields);
      dispatch({ type: DELETE_COMMENT_SUCCESS });
    } catch (error: any) {
      console.log('Delete comment error: ', error);
      dispatch({
        type: DELETE_COMMENT_FAILURE,
        error: error
      });
    }
  }
}

export function likeComment(fields: object) {
  return async (dispatch: any) => {
    dispatch({ type: IS_LIKING_COMMENT });
    try {
      await commentApi.likeComment(fields);
      dispatch({ type: LIKE_COMMENT_SUCCESS });
    } catch (error: any) {
      console.log('Like comment error: ', error);
      dispatch({
        type: LIKE_COMMENT_FAILURE,
        error: error
      });
    }
  }
}

export function fetchPostComments(fields: string) {
  return async (dispatch: any) => {
    dispatch({ type: IS_FETCHING_POST_COMMENTS });
    try {
      const result = await commentApi.fetchPostComments(fields);
      dispatch({ 
        type: FETCH_POST_COMMENTS_SUCCESS,
        postComments: result
      });
      return result;
    } catch (error: any) {
      console.log('Fetch Post Comments error: ', error);
      dispatch({
        type: FETCH_POST_COMMENTS_FAILURE,
        error: error
      });
    };
  }
}

export function fetchCommentInfo(fields: string) {
  return async (dispatch: any) => {
    dispatch({ type: IS_FETCHING_COMMENT_INFO });
    try {
      const result = await commentApi.fetchCommentInfo(fields);
      dispatch({
        type: FETCH_COMMENT_INFO_SUCCESS,
        commentInfo: result
      });
      return result;
    } catch (error: any) {
      console.log('Fetch Comment Info error: ', error);
      dispatch({
        type: FETCH_COMMENT_INFO_FAILURE,
        error: error
      });
    }
  }
}
