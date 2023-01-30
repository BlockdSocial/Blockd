import {
  IS_CREATING_POST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  IS_DELETING_POST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE
} from './PostActionTypes';

// Api
import { postApi } from '../../api';

export function createPost(fields: object) {
  return async (dispatch: any) => {
    dispatch({ type: IS_CREATING_POST });
    try {
      await postApi.createPost(fields);
      dispatch({
        type: CREATE_POST_SUCCESS,
      });
    } catch (error: any) {
      console.log('Post error: ', error);
      dispatch({
        type: CREATE_POST_FAILURE,
        error: error.message
      });
    }
  }
}

export function deletePost(fields: object) {
  return async (dispatch: any) => {
    dispatch({ type: IS_DELETING_POST });
    try {
      await postApi.deletePost(fields);
      dispatch({ type: DELETE_POST_SUCCESS });
    } catch (error: any) {
      console.log('Delete Post error: ', error);
      dispatch({
        type: DELETE_POST_FAILURE,
        error: error.message
      });
    }
  }
}
