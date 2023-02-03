// Action types
import {
  IS_UPDATING_PROFILE_PICTURE,
  UPDATE_PROFILE_PICTURE_SUCCESS,
  UPDATE_PROFILE_PICTURE_FAILURE,
  IS_UPDATING_PROFILE_BANNER,
  UPDATE_PROFILE_BANNER_SUCCESS,
  UPDATE_PROFILE_BANNER_FAILURE,
  IS_FETCHING_FOLLOWERS,
  FETCH_FOLLOWERS_SUCCESS,
  FETCH_FOLLOWERS_FAILURE,
  IS_FETCHING_FOLLOWINGS,
  FETCH_FOLLOWINGS_SUCCESS,
  FETCH_FOLLOWINGS_FAILURE,
  IS_UPDATING_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  IS_FETCHING_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE
} from './UserActionTypes';

const initialState = {
  error: '',
  isUpdatingProfilePicture: false,
  isUpdatingProfileBanner: false,
  isFetchingFollowers: false,
  isFetchingFollowings: false,
  isUpdatingUser: false,
  isFetchingUser: false,
  user: {},
  followers: [],
  followings: []
};

export function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case IS_UPDATING_PROFILE_PICTURE: {
      return {
        ...state,
        isUpdatingProfilePicture: true
      };
    }
    case UPDATE_PROFILE_PICTURE_SUCCESS: {
      return {
        ...state,
        isUpdatingProfilePicture: false
      };
    }
    case UPDATE_PROFILE_PICTURE_FAILURE: {
      return {
        ...state,
        error: action.error,
        isUpdatingProfilePicture: false
      };
    }
    case IS_UPDATING_PROFILE_BANNER: {
      return {
        ...state,
        isUpdatingProfileBanner: true
      };
    }
    case UPDATE_PROFILE_BANNER_SUCCESS: {
      return {
        ...state,
        isUpdatingProfileBanner: false
      };
    }
    case UPDATE_PROFILE_BANNER_FAILURE: {
      return {
        ...state,
        isUpdatingProfileBanner: false,
        error: action.error
      };
    }
    case IS_FETCHING_FOLLOWERS: {
      return {
        ...state,
        isFetchingFollowers: true
      };
    }
    case FETCH_FOLLOWERS_SUCCESS: {
      return {
        ...state,
        isFetchingFollowers: false,
        followers: action.followers
      };
    }
    case FETCH_FOLLOWERS_FAILURE: {
      return {
        ...state,
        isFetchingFollowers: false,
        error: action.error
      };
    }
    case IS_FETCHING_FOLLOWINGS: {
      return {
        ...state,
        isFetchingFollowings: true
      };
    }
    case FETCH_FOLLOWINGS_SUCCESS: {
      return {
        ...state,
        isFetchingFollowings: false,
        followings: action.followings
      };
    }
    case FETCH_FOLLOWINGS_FAILURE: {
      return {
        ...state,
        isFetchingFollowers: false,
        error: action.error
      };
    }
    case IS_UPDATING_USER: {
      return {
        ...state,
        isUpdatingUser: true
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        isUpdatingUser: false
      };
    }
    case UPDATE_USER_FAILURE: {
      return {
        ...state,
        isUpdatingUser: false,
        error: action.error
      };
    }
    case IS_FETCHING_USER: {
      return {
        ...state,
        isFetchingUser: true
      };
    }
    case FETCH_USER_SUCCESS: {
      return {
        ...state,
        isFetchingUser: false,
        user: action.user
      };
    }
    case FETCH_USER_FAILURE: {
      return {
        ...state,
        isFetchingUser: false,
        error: action.error
      };
    }
    default: {
      return state;
    }
  }
}
