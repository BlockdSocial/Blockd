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
  FETCH_FILTERED_POSTS_FAILURE
} from './PostActionTypes';

const initialState = {
  error: '',
  isCreatingPost: false,
  isDeletingPost: false,
  isLikingPost: false,
  isSearchingPosts: false,
  isFetchingTrendingPosts: false,
  isFetchingFilteredPosts: false,
  filteredPosts: [],
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
    default: {
      return state;
    }
  }
}
