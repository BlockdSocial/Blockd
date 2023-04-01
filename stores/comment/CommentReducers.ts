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
  DISLIKE_COMMENT_FAILURE,
  IS_REPLYING_COMMENT,
  REPLY_COMMENT_SUCCESS,
  REPLY_COMMENT_FAILURE,
  IS_FETCHING_COMMENT,
  FETCH_COMMENT_SUCCESS,
  FETCH_COMMENT_FAILURE,
  IS_FETCHING_COMMENT_REPLIES,
  FETCH_COMMENT_REPLIES_SUCCESS,
  FETCH_COMMENT_REPLIES_FAILURE,
  IS_FETCHING_REPLY_INFO,
  FETCH_REPLY_INFO_SUCCESS,
  FETCH_REPLY_INFO_FAILURE,
  IS_LIKING_REPLY,
  LIKE_REPLY_SUCCESS,
  LIKE_REPLY_FAILURE,
  IS_DISLIKING_REPLY,
  DISLIKE_REPLY_SUCCESS,
  DISLIKE_REPLY_FAILURE
} from './CommentActionTypes';

const initialState = {
  error: '',
  isAddingComment: false,
  isDeletingComment: false,
  isLikingComment: false,
  isDislikingComment: false,
  isFetchingPostComments: false,
  isFetchingCommentInfo: false,
  isFetchingIsLikedCommet: false,
  isFetchingIsDislikedComment: false,
  isLikedComment: false,
  isDislikedComment: false,
  isReplyingComment: false,
  isFetchingComment: false,
  isFetchingReplyInfo: false,
  replyInfo: {},
  comment: {},
  isFetchingCommentReplies: false,
  commentReplies: [],
  commentInfo: [],
  postComments: [],
  isLikingReply: false,
  isDislikingReply: false,
};

export function commentReducer(state = initialState, action: any) {
  switch (action.type) {
    case IS_ADDING_COMMENT: {
      return {
        ...state,
        isAddingComment: true,
        error: ''
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
        isDeletingComment: true,
        error: ''
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
        isLikingComment: true,
        error: ''
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
    case IS_DISLIKING_COMMENT: {
      return {
        ...state,
        isDislikingComment: true,
        error: ''
      };
    }
    case DISLIKE_COMMENT_SUCCESS: {
      return {
        ...state,
        isDislikingComment: false
      };
    }
    case DISLIKE_COMMENT_FAILURE: {
      return {
        ...state,
        isDislikingComment: false,
        error: action.error
      };
    }
    case IS_FETCHING_POST_COMMENTS: {
      return {
        ...state,
        isFetchingPostComments: true,
        error: ''
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
    case IS_FETCHING_COMMENT_INFO: {
      return {
        ...state,
        isFetchingCommentInfo: true,
        error: ''
      };
    }
    case FETCH_COMMENT_INFO_SUCCESS: {
      return {
        ...state,
        isFetchingCommentInfo: false,
        commentInfo: action.commentInfo
      };
    }
    case FETCH_COMMENT_INFO_FAILURE: {
      return {
        ...state,
        isFetchingCommentInfo: false,
        error: action.error
      };
    }
    case IS_FETCHING_IS_LIKED_COMMENT: {
      return {
        ...state,
        isFetchingIsLikedCommet: true,
        error: ''
      };
    }
    case FETCH_IS_LIKED_COMMENT_SUCCESS: {
      return {
        ...state,
        isFetchingIsLikedCommet: false,
        isLikedComment: action.isLikedComment 
      };
    }
    case FETCH_IS_LIKED_COMMENT_FAILURE: {
      return {
        ...state,
        isFetchingIsLikedCommet: false,
        error: action.error
      };
    }
    case IS_FETCHING_IS_DISLIKED_COMMENT: {
      return {
        ...state,
        isFetchingIsDislikedComment: true,
        error: ''
      };
    }
    case FETCH_IS_DISLIKED_COMMENT_SUCCESS: {
      return {
        ...state,
        isFetchingIsDislikedComment: false,
        isDislikedComment: action.isDislikedComment
      };
    }
    case FETCH_IS_DISLIKED_COMMENT_FAILURE: {
      return {
        ...state,
        isFetchingIsDislikedComment: false,
        error: action.error
      };
    }
    case IS_REPLYING_COMMENT: {
      return {
        ...state,
        isReplyingComment: true,
        error: ''
      };
    }
    case REPLY_COMMENT_SUCCESS: {
      return {
        ...state,
        isReplyingComment: false
      };
    }
    case REPLY_COMMENT_FAILURE: {
      return {
        ...state,
        isReplyingComment: false,
        error: action.error
      };
    }
    case IS_FETCHING_COMMENT: {
      return {
        ...state,
        isFetchingComment: true,
        error: ''
      };
    }
    case FETCH_COMMENT_SUCCESS: {
      return {
        ...state,
        isFetchingComment: false,
        comment: action.comment
      };
    }
    case FETCH_COMMENT_FAILURE: {
      return {
        ...state,
        isFetchingComment: false,
        error: action.error
      };
    }
    case IS_FETCHING_COMMENT_REPLIES: {
      return {
        ...state,
        isFetchingCommentReplies: true,
        error: ''
      };
    }
    case FETCH_COMMENT_REPLIES_SUCCESS: {
      return {
        ...state,
        isFetchingCommentReplies: false,
        commentReplies: action.commentReplies
      };
    }
    case FETCH_COMMENT_REPLIES_FAILURE: {
      return {
        ...state,
        isFetchingCommentReplies: false,
        error: action.error
      };
    }
    case IS_FETCHING_REPLY_INFO: {
      return {
        ...state,
        isFetchingReplyInfo: true,
        error: ''
      };
    }
    case FETCH_REPLY_INFO_SUCCESS: {
      return {
        ...state,
        isFetchingReplyInfo: false,
        commentInfo: action.commentInfo
      };
    }
    case FETCH_REPLY_INFO_FAILURE: {
      return {
        ...state,
        isFetchingReplyInfo: false,
        error: action.error
      };
    }
    case IS_LIKING_REPLY: {
      return {
        ...state,
        isLikingReply: true,
        error: ''
      };
    }
    case LIKE_REPLY_SUCCESS: {
      return {
        ...state,
        isLikingReply: false
      };
    }
    case LIKE_REPLY_FAILURE: {
      return {
        ...state,
        isLikingReply: false,
        error: action.error
      };
    }
    case IS_DISLIKING_REPLY: {
      return {
        ...state,
        isDislikingReply: true,
        error: ''
      };
    }
    case DISLIKE_REPLY_SUCCESS: {
      return {
        ...state,
        isDislikingReply: false
      };
    }
    case DISLIKE_REPLY_FAILURE: {
      return {
        ...state,
        isDislikingReply: false
      };
    }
    default: {
      return state;
    }
  }
}
