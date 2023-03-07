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
  FETCH_USER_FAILURE,
  IS_SEARCHING_POPULAR_USERS,
  SEARCH_POPULAR_USERS_SUCCESS,
  SEARCH_POPULAR_USERS_FAILURE,
  IS_FOLLOWING_USER,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  IS_FETCHING_REWARDS,
  FETCH_REWARDS_SUCCESS,
  FETCH_REWARDS_FAILURE,
  IS_SETTING_FRAME,
  SET_FRAME_SUCCESS,
  SET_FRAME_FAILURE,
  IS_FETCHING_FOLLOWED,
  FETCH_FOLLOWED_SUCCESS,
  FETCH_FOLLOWED_FAILURE,
  IS_RESETING_BELL,
  RESET_BELL_SUCCESS,
  RESET_BELL_FAILURE
} from './UserActionTypes';

const initialState = {
  error: '',
  isUpdatingProfilePicture: false,
  isUpdatingProfileBanner: false,
  isFetchingFollowers: false,
  isFetchingFollowings: false,
  isUpdatingUser: false,
  isFetchingUser: false,
  isSearchingPopularUsers: false,
  isFollowingUser: false,
  isFetchingRewards: false,
  isSettingFrame: false,
  isFetchingFollowed: false,
  isFollowed: false,
  isResetingBell: false,
  rewards: [],
  popularUsers: [],
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
    case IS_SEARCHING_POPULAR_USERS: {
      return {
        ...state,
        isSearchingPopularUsers: true
      };
    }
    case SEARCH_POPULAR_USERS_SUCCESS: {
      return {
        ...state,
        isSearchingPopularUsers: false,
        popularUsers: action.popularUsers
      };
    }
    case SEARCH_POPULAR_USERS_FAILURE: {
      return {
        ...state,
        isSearchingPopularUsers: false,
        error: action.error
      };
    }
    case IS_FOLLOWING_USER: {
      return {
        ...state,
        isFollowingUser: true
      };
    }
    case FOLLOW_USER_SUCCESS: {
      return {
        ...state,
        isFollowingUser: false
      };
    }
    case FOLLOW_USER_FAILURE: {
      return {
        ...state,
        isFollowingUser: false,
        error: action.error
      };
    }
    case IS_FETCHING_REWARDS: {
      return {
        ...state,
        isFetchingRewards: true
      };
    }
    case FETCH_REWARDS_SUCCESS: {
      return {
        ...state,
        isFetchingRewards: false,
        rewards: action.rewards
      };
    }
    case FETCH_REWARDS_FAILURE: {
      return {
        ...state,
        isFetchingRewards: false,
        error: action.error
      };
    }
    case IS_SETTING_FRAME: {
      return {
        ...state,
        isSettingFrame: true
      };
    }
    case SET_FRAME_SUCCESS: {
      return {
        ...state,
        isSettingFrame: false
      };
    }
    case SET_FRAME_FAILURE: {
      return {
        ...state,
        isSettingFrame: false,
        error: action.error
      };
    }
    case IS_FETCHING_FOLLOWED: {
      return {
        ...state,
        isFetchingFollowed: true
      };
    }
    case FETCH_FOLLOWED_SUCCESS: {
      return {
        ...state,
        isFetchingFollowed: false,
        isFollowed: action.isFollowed
      };
    }
    case FETCH_FOLLOWED_FAILURE: {
      return {
        ...state,
        isFetchingFollowed: false,
        error: action.error
      };
    }
    case IS_RESETING_BELL: {
      return {
        ...state,
        isResetingBell: true
      };
    }
    case RESET_BELL_SUCCESS: {
      return {
        ...state,
        isResetingBell: false
      };
    }
    case RESET_BELL_FAILURE: {
      return {
        ...state,
        isResetingBell: false,
        error: action.error
      };
    }
    default: {
      return state;
    }
  }
}
