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
  FETCH_COMMENT_INFO_FAILURE,
  IS_FETCHING_IS_LIKED_COMMENT,
  FETCH_IS_LIKED_COMMENT_SUCCESS,
  FETCH_IS_LIKED_COMMENT_FAILURE,
  IS_FETCHING_IS_DISLIKED_COMMENT,
  FETCH_IS_DISLIKED_COMMENT_SUCCESS,
  FETCH_IS_DISLIKED_COMMENT_FAILURE,
  IS_DISLIKING_COMMENT,
  DISLIKE_COMMENT_SUCCESS,
  DISLIKE_COMMENT_FAILURE
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

export function dislikeComment(fields: object) {
  return async (dispatch: any) => {
    dispatch({ type: IS_DISLIKING_COMMENT });
    try {
      await commentApi.dislikeComment(fields);
      dispatch({ type: DISLIKE_COMMENT_SUCCESS });
    } catch (error: any) {
      console.log('Dislike comment error: ', error);
      dispatch({
        type: DISLIKE_COMMENT_FAILURE,
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

export function fetchIsLikedComment(fields: string) {
  return async (dispatch: any) => {
    dispatch({ type: IS_FETCHING_IS_LIKED_COMMENT });
    try {
      const result = await commentApi.fetchIsLikedComment(fields);
      dispatch({
        type: FETCH_IS_LIKED_COMMENT_SUCCESS,
        isLikedComment: result
      });
      return result;
    } catch (error: any) {
      console.log('Fetch Is Liked comment error: ', error);
      dispatch({
        type: FETCH_IS_LIKED_COMMENT_FAILURE,
        error: error
      });
    }
  }
}

export function fetchIsDislikedComment(fields: any) {
  return async (dispatch: any) => {
    dispatch({ type: IS_FETCHING_IS_DISLIKED_COMMENT });
    try {
      const result = await commentApi.fetchIsDislikedComment(fields);
      dispatch({
        type: FETCH_IS_DISLIKED_COMMENT_SUCCESS,
        isDislikedComment: result
      });
      return result;
    } catch (error: any) {
      console.log('Fetch Is Disliked comment error: ', error);
      dispatch({
        type: FETCH_IS_DISLIKED_COMMENT_FAILURE,
        error: error
      });
    }
  }
}
