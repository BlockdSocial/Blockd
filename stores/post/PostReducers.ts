// Action types
import {
  IS_CREATING_POST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  IS_DELETING_POST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  IS_LIKING_POST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  IS_SEARCHING_POSTS,
  SEARCH_POSTS_SUCCESS,
  SEARCH_POSTS_FAILURE,
  IS_FETCHING_TRENDING_POSTS,
  FETCH_TRENDING_POSTS_SUCCESS,
  FETCH_TRENDING_POSTS_FAILURE,
  IS_FETCHING_FILTERED_POSTS,
  FETCH_FILTERED_POSTS_SUCCESS,
  FETCH_FILTERED_POSTS_FAILURE,
  IS_FETCHING_POST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAILURE,
  IS_FETCHING_POST_IMAGE,
  FETCH_POST_IMAGE_SUCCESS,
  FETCH_POST_IMAGE_FAILURE,
  IS_FETCHING_POST_INFO,
  FETCH_POST_INFO_SUCCESS,
  FETCH_POST_INFO_FAILURE,
  IS_FETCHING_USER_POSTS,
  FETCH_USER_POSTS_SUCCESS,
  FETCH_USER_POSTS_FAILURE,
  IS_DISLIKING_POST,
  DISLIKE_POST_SUCCESS,
  DISLIKE_POST_FAILURE,
  IS_FETCHING_IS_LIKED,
  FETCH_IS_LIKED_SUCCESS,
  FETCH_IS_DISLIKED_FAILURE,
  IS_FETCHING_IS_DISLIKED,
  FETCH_IS_DISLIKED_SUCCESS,
  IS_ADDING_POST_VIEW,
  ADD_POST_VIEW_SUCCESS,
  ADD_POST_VIEW_ERROR,
  IS_UPDATING_POST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  IS_SUGGESTING,
  SUGGEST_SUCCESS,
  SUGGEST_FAILURE,
  IS_SHARING_POST,
  SHARE_POST_SUCCESS,
  SHARE_POST_FAILURE,
  IS_FETCHING_SHARED_POST,
  FETCH_POST_SHARED_SUCCESS,
  FETCH_POST_SHARED_FAILURE,
  IS_CREATING_SUGGESTION,
  CREATE_SUGGESTION_SUCCESS,
  CREATE_SUGGESTION_FAILURE,
  IS_FETCHING_SUGGESTIONS,
  FETCH_SUGGESTIONS_SUCCESS,
  FETCH_SUGGESTIONS_FAILURE
} from './PostActionTypes';

const initialState = {
  error: '',
  isCreatingPost: false,
  isDeletingPost: false,
  isLikingPost: false,
  isDislikingPost: false,
  isSearchingPosts: false,
  isFetchingTrendingPosts: false,
  isFetchingFilteredPosts: false,
  isFetchingPost: false,
  isFetchingPostImage: false,
  isFetchingPostInfo: false,
  isFetchingUserPosts: false,
  isFetchingIsLiked: false,
  isLiked: false,
  isFetchingIsDisliked: false,
  isDisliked: false,
  isAddingPostView: false,
  isUpdatingPost: false,
  isSuggesting: false,
  isSharingPost: false,
  isCreatingSuggestion: false,
  isFetchingSuggestions: false,
  suggestions: [],
  userPosts: [],
  postInfo: {},
  postImage: {},
  post: {},
  sharedPost: {},
  filteredPosts: {},
  trendingPosts: [],
  postsResults: []
};

export function postReducer(state = initialState, action: any) {
  switch (action.type) {
    case IS_CREATING_POST: {
      return {
        ...state,
        isCreatingPost: true
      };
    }
    case CREATE_POST_SUCCESS: {
      return {
        ...state,
        isCreatingPost: false
      };
    }
    case CREATE_POST_FAILURE: {
      return {
        ...state,
        error: action.error,
        isCreatingPost: false
      };
    }
    case IS_DELETING_POST: {
      return {
        ...state,
        isDeletingPost: true
      };
    }
    case DELETE_POST_SUCCESS: {
      return {
        ...state,
        isDeletingPost: false
      };
    }
    case DELETE_POST_FAILURE: {
      return {
        ...state,
        isDeletingPost: false,
        error: action.error
      };
    }
    case IS_LIKING_POST: {
      return {
        ...state,
        isLikingPost: true
      };
    }
    case LIKE_POST_SUCCESS: {
      return {
        ...state,
        isLikingPost: false,
      };
    }
    case LIKE_POST_FAILURE: {
      return {
        ...state,
        isLikingPost: false,
        error: action.error
      };
    }
    case IS_SEARCHING_POSTS: {
      return {
        ...state,
        isSearchingPosts: true
      };
    }
    case SEARCH_POSTS_SUCCESS: {
      return {
        ...state,
        isSearchingPosts: false,
        postsResults: action.postsResults
      };
    }
    case SEARCH_POSTS_FAILURE: {
      return {
        ...state,
        isSearchingPosts: false,
        error: action.error
      };
    }
    case IS_FETCHING_TRENDING_POSTS: {
      return {
        ...state,
        isFetchingTrendingPosts: true
      };
    }
    case FETCH_TRENDING_POSTS_SUCCESS: {
      return {
        ...state,
        isFetchingTrendingPosts: false,
        trendingPosts: action.trendingPosts
      };
    }
    case FETCH_TRENDING_POSTS_FAILURE: {
      return {
        ...state,
        isFetchingTrendingPosts: false,
        error: action.error
      };
    }
    case IS_FETCHING_FILTERED_POSTS: {
      return {
        ...state,
        isFetchingFilteredPosts: true
      };
    }
    case FETCH_FILTERED_POSTS_SUCCESS: {
      return {
        ...state,
        isFetchingFilteredPosts: false,
        filteredPosts: action.filteredPosts
      };
    }
    case FETCH_FILTERED_POSTS_FAILURE: {
      return {
        ...state,
        isFetchingFilteredPosts: false,
        error: action.error
      };
    }
    case IS_FETCHING_POST: {
      return {
        ...state,
        isFetchingPost: true
      };
    }
    case FETCH_POST_SUCCESS: {
      return {
        ...state,
        isFetchingPost: false,
        post: action.post
      };
    }
    case FETCH_POST_FAILURE: {
      return {
        ...state,
        isFetchingPost: false,
        error: action.error
      };
    }
    case IS_FETCHING_SHARED_POST: {
      return {
        ...state,
        isFetchingPost: true
      };
    }
    case FETCH_POST_SHARED_SUCCESS: {
      return {
        ...state,
        isFetchingPost: false,
        sharedPost: action.sharedPost
      };
    }
    case FETCH_POST_SHARED_FAILURE: {
      return {
        ...state,
        isFetchingPost: false,
        error: action.error
      };
    }
    case IS_FETCHING_POST_IMAGE: {
      return {
        ...state,
        isFetchingPostImage: true
      };
    }
    case FETCH_POST_IMAGE_SUCCESS: {
      return {
        ...state,
        isFetchingPostImage: false,
        postImage: action.postImage
      };
    }
    case FETCH_POST_IMAGE_FAILURE: {
      return {
        ...state,
        isFetchingPostImage: false,
        error: action.error
      };
    }
    case IS_FETCHING_POST_INFO: {
      return {
        ...state,
        isFetchingPostInfo: true
      };
    }
    case FETCH_POST_INFO_SUCCESS: {
      return {
        ...state,
        isFetchingPostInfo: false,
        postInfo: action.postInfo
      };
    }
    case FETCH_POST_INFO_FAILURE: {
      return {
        ...state,
        isFetchingPostInfo: false,
        error: action.error
      };
    }
    case IS_FETCHING_USER_POSTS: {
      return {
        ...state,
        isFetchingUserPosts: true
      };
    }
    case FETCH_USER_POSTS_SUCCESS: {
      return {
        ...state,
        isFetchingUserPosts: false,
        userPosts: action.userPosts
      };
    }
    case FETCH_USER_POSTS_FAILURE: {
      return {
        ...state,
        isFetchingUserPosts: false,
        error: action.error
      };
    }
    case IS_DISLIKING_POST: {
      return {
        ...state,
        isDislikingPost: true
      };
    }
    case DISLIKE_POST_SUCCESS: {
      return {
        ...state,
        isDislikingPost: false
      };
    }
    case DISLIKE_POST_FAILURE :{
      return {
        ...state,
        isDislikingPost: false,
        error: action.error
      };
    }
    case IS_FETCHING_IS_LIKED: {
      return {
        ...state,
        isFetchingIsLiked: true
      };
    }
    case FETCH_IS_LIKED_SUCCESS: {
      return {
        ...state,
        isFetchingIsLiked: false,
        isLiked: action.isLiked
      };
    }
    case FETCH_IS_DISLIKED_FAILURE: {
      return {
        ...state,
        isFetchingIsLiked: false,
        error: action.error
      };
    }
    case IS_FETCHING_IS_DISLIKED: {
      return {
        ...state,
        isFetchingIsDisliked: true,
      };
    }
    case FETCH_IS_DISLIKED_SUCCESS: {
      return {
        ...state,
        isFetchingIsDisliked: false,
        isDisliked: action.isDisliked
      };
    }
    case FETCH_IS_DISLIKED_FAILURE: {
      return {
        ...state,
        isFetchingIsDisliked: false,
        error: action.error
      };
    }
    case IS_ADDING_POST_VIEW: {
      return {
        ...state,
        isAddingPostView: true
      };
    }
    case ADD_POST_VIEW_SUCCESS: {
      return {
        ...state,
        isAddingPostView: false
      };
    }
    case ADD_POST_VIEW_ERROR: {
      return {
        ...state,
        isAddingPostView: false,
        error: action.error
      };
    }
    case IS_UPDATING_POST: {
      return {
        ...state,
        isUpdatingPost: true
      };
    }
    case UPDATE_POST_SUCCESS: {
      return {
        ...state,
        isUpdatingPost: false,
      };
    }
    case UPDATE_POST_FAILURE: {
      return {
        ...state,
        isUpdatingPost: false,
        error: action.error
      };
    }
    case IS_SUGGESTING: {
      return {
        ...state,
        isSuggesting: true,
      };
    }
    case SUGGEST_SUCCESS: {
      return {
        ...state,
        isSuggesting: false,
      };
    }
    case SUGGEST_FAILURE: {
      return {
        ...state,
        isSuggesting: false,
        error: action.error
      };
    }
    case IS_SHARING_POST: {
      return {
        ...state,
        isSharingPost: true
      };
    }
    case SHARE_POST_SUCCESS: {
      return {
        ...state,
        isSharingPost: false
      };
    }
    case SHARE_POST_FAILURE: {
      return {
        ...state,
        isSharingPost: false,
        error: action.error
      };
    }
    case IS_CREATING_SUGGESTION: {
      return {
        ...state,
        isCreatingSuggestion: true
      };
    }
    case CREATE_SUGGESTION_SUCCESS: {
      return {
        ...state,
        isCreatingSuggestion: false
      };
    }
    case CREATE_SUGGESTION_FAILURE: {
      return {
        ...state,
        error: action.error
      };
    }
    case IS_FETCHING_SUGGESTIONS: {
      return {
        ...state,
        isFetchingSuggestions: true
      };
    }
    case FETCH_SUGGESTIONS_SUCCESS: {
      return {
        ...state,
        isFetchingSuggestions: false,
        suggestions: action.suggestions
      };
    }
    case FETCH_SUGGESTIONS_FAILURE: {
      return {
        ...state,
        isFetchingSuggestions: false,
        error: action.error
      };
    }
    default: {
      return state;
    }
  }
}
