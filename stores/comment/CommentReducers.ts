// Action types
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
  FETCH_POST_COMMENTS_FAILURE
} from './CommentActionTypes';

const initialState = {
  error: '',
  isAddingComment: false,
  isDeletingComment: false,
  isLikingComment: false,
  isFetchingPostComments: false,
  postComments: []
};

export function commentReducer(state = initialState, action: any) {
  switch (action.type) {
    case IS_ADDING_COMMENT: {
      return {
        ...state,
        isAddingComment: true
      };
    }
    case ADD_COMMENT_SUCCESS: {
      return {
        ...state,
        isAddingComment: false
      };
    }
    case ADD_COMMENT_FAILURE: {
      return {
        ...state,
        isAddingComment: false,
        error: action.error
      };
    }
    case IS_DELETING_COMMENT: {
      return {
        ...state,
        isDeletingComment: true
      };
    }
    case DELETE_COMMENT_SUCCESS: {
      return {
        ...state,
        isDeletingComment: false
      };
    }
    case DELETE_COMMENT_FAILURE: {
      return {
        ...state,
        isDeletingComment: false,
        error: action.error
      };
    }
    case IS_LIKING_COMMENT: {
      return {
        ...state,
        isLikingComment: true
      };
    }
    case LIKE_COMMENT_SUCCESS: {
      return {
        ...state,
        isLikingComment: false
      };
    }
    case LIKE_COMMENT_FAILURE: {
      return {
        ...state,
        isLikingComment: false,
        error: action.error
      };
    }
    case IS_FETCHING_POST_COMMENTS: {
      return {
        ...state,
        isFetchingPostComments: true,
      };
    }
    case FETCH_POST_COMMENTS_SUCCESS: {
      return {
        ...state,
        isFetchingPostComments: false,
        postComments: action.postComments
      };
    }
    case FETCH_POST_COMMENTS_FAILURE: {
      return {
        ...state,
        isFetchingPostComments: false,
        error: action.error
      };
    }
    default: {
      return state;
    }
  }
}
