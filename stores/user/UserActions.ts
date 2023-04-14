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
  RESET_BELL_FAILURE,
  IS_RESETING_MESSAGES,
  RESET_MESSAGES_SUCCESS,
  RESET_MESSAGES_FAILURE,
  IS_SEARCHING_FILTERED_USERS,
  SEARCH_FILTERED_USERS_SUCCESS,
  SEARCH_FILTERED_USERS_FAILURE,
  IS_CHECKING_EMAIL,
  CHECK_EMAIL_SUCCESS,
  CHECK_EMAIL_FAILURE,
  IS_SEARCHING_TAG_USERS,
  SEARCH_TAG_USERS_SUCCESS,
  SEARCH_TAG_USERS_FAILURE
} from './UserActionTypes';

// Api
import { userApi } from '../../api';

export function updateProfilcePicture(fields: object) {
  return async (dispatch: any) => {
    dispatch({ type: IS_UPDATING_PROFILE_PICTURE });
    try {
      await userApi.updateProfilePicture(fields);
      dispatch({
        type: UPDATE_PROFILE_PICTURE_SUCCESS,
      });
    } catch (error: any) {
      console.log('Update Profile Picture error: ', error);
      dispatch({
        type: UPDATE_PROFILE_PICTURE_FAILURE,
        // error: error?.message
      });
    }
  }
}

export function updateProfileBanner(fields: object) {
  return async (dispatch: any) => {
    dispatch({ type: IS_UPDATING_PROFILE_BANNER });
    try {
      await userApi.updateProfileBanner(fields);
      dispatch({
        type: UPDATE_PROFILE_BANNER_SUCCESS,
      });
    } catch (error: any) {
      console.log('Update Profile Banner error: ', error);
      dispatch({
        type: UPDATE_PROFILE_BANNER_FAILURE,
        // error: error?.message
      });
    }
  }
}

export function fetchFollowers(fields: any) {
  return async (dispatch: any) => {
    dispatch({ type: IS_FETCHING_FOLLOWERS });
    try {
      const result = await userApi.fetchFollowers(fields);
      dispatch({
        type: FETCH_FOLLOWERS_SUCCESS,
        followers: result
      });
    } catch (error: any) {
      console.log('Fetch Followers error: ', error);
      dispatch({
        type: FETCH_FOLLOWERS_FAILURE,
        error: error?.message
      });
    }
  }
}

export function fetchFollowings(fields: any) {
  return async (dispatch: any) => {
    dispatch({ type: IS_FETCHING_FOLLOWINGS });
    try {
      const result = await userApi.fetchFollowings(fields);
      dispatch({
        type: FETCH_FOLLOWINGS_SUCCESS,
        followings: result
      });
    } catch (error: any) {
      console.log('Fetch followings error: ', error);
      dispatch({
        type: FETCH_FOLLOWINGS_FAILURE,
        error: error?.message
      });
    }
  }
}

export function updateUser(fields: object) {
  return async (dispatch: any) => {
    dispatch({ type: IS_UPDATING_USER });
    try {
      await userApi.updateUser(fields);
      dispatch({
        type: UPDATE_USER_SUCCESS
      });
    } catch (error: any) {
      console.log('Update user error: ', error);
      dispatch({
        type: UPDATE_USER_FAILURE,
        error: error?.message
      });
    }
  }
}

export function fetchUser(fields: any) {
  return async (dispatch: any) => {
    dispatch({ type: IS_FETCHING_USER });
    try {
      const result = await userApi.fetchUser(fields);
      dispatch({
        type: FETCH_USER_SUCCESS,
        user: result
      });
      return result;
    } catch (error: any) {
      console.log('Fetch user error: ', error);
      dispatch({
        type: FETCH_USER_FAILURE,
        error: error?.message
      });
    }
  }
}

export function searchUsers(fields: any) {
  return async (dispatch: any) => {
    dispatch({ type: IS_SEARCHING_POPULAR_USERS });
    try {
      const result: any = await userApi.searchUsers(fields);
      dispatch({
        type: SEARCH_POPULAR_USERS_SUCCESS,
        popularUsers: result
      });
      return result;
    } catch (error: any) {
      console.log('Search Popular Users Error: ', error);
      dispatch({
        type: SEARCH_POPULAR_USERS_FAILURE,
        error: error?.message
      });
    }
  }
}

export function searchFilteredUsers(fields: any) {
  return async (dispatch: any) => {
    dispatch({ type: IS_SEARCHING_FILTERED_USERS });
    try {
      const result = await userApi.searchFilteredUsers(fields);
      dispatch({
        type: SEARCH_FILTERED_USERS_SUCCESS,
        filteredUsers: result
      });
      return result;
    } catch (error: any) {
      console.log('Search Filtered users error: ', error);
      dispatch({
        type: SEARCH_FILTERED_USERS_FAILURE,
        error: error.message
      });
    }
  }
}

export function followUser(fields: any) {
  return async (dispatch: any) => {
    dispatch({ type: IS_FOLLOWING_USER });
    try {
      await userApi.followUser(fields);
      dispatch({
        type: FOLLOW_USER_SUCCESS,
      });
    } catch (error: any) {
      console.log('Follow User Error: ', error);
      dispatch({
        type: FOLLOW_USER_FAILURE,
        error: error?.message
      });
    }
  }
}

export function fetchUserRewards() {
  return async (dispatch: any) => {
    dispatch({ type: IS_FETCHING_REWARDS });
    try {
      const result = await userApi.fetchUserRewards();
      dispatch({
        type: FETCH_REWARDS_SUCCESS,
        rewards: result
      });
      return result;
    } catch (error: any) {
      console.log('Fetch rewards error: ', error);
      dispatch({
        type: FETCH_REWARDS_FAILURE,
        error: error?.message
      });
    }
  }
}

export function setUserFrame(fields: any) {
  return async (dispatch: any) => {
    dispatch({ type: IS_SETTING_FRAME });
    try {
      await userApi.setUserFrame(fields);
      dispatch({
        type: SET_FRAME_SUCCESS,
      });
    } catch (error: any) {
      console.log('Set frame Error: ', error);
      dispatch({
        type: SET_FRAME_FAILURE,
        // error: error?.message
      });
    }
  }
}

export function fetchIsFollowed(fields: any) {
  return async (dispatch: any) => {
    dispatch({ type: IS_FETCHING_FOLLOWED });
    try {
      const result = await userApi.isFollowed(fields);
      dispatch({
        type: FETCH_FOLLOWED_SUCCESS,
        isFollowed: result?.value
      });
      return result;
    } catch (error: any) {
      console.log('Fetch is followed error: ', error);
      dispatch({
        type: FETCH_FOLLOWED_FAILURE,
        error: error?.message
      });
    }
  }
}

export function resetBell() {
  return async (dispatch: any) => {
    dispatch({ type: IS_RESETING_BELL });
    try {
      await userApi.resetBell();
      dispatch({
        type: RESET_BELL_SUCCESS
      });
    } catch (error: any) {
      console.log('Reset Bell error: ', error);
      dispatch({
        type: RESET_BELL_FAILURE,
        error: error?.message
      });
    }
  }
}

export function resetMessages() {
  return async (dispatch: any) => {
    dispatch({ type: IS_RESETING_MESSAGES });
    try {
      await userApi.resetMessages();
      dispatch({
        type: RESET_MESSAGES_SUCCESS
      });
    } catch (error: any) {
      console.log('Reset messages error: ', error);
      dispatch({
        type: RESET_MESSAGES_FAILURE,
        error: error?.message
      });
    }
  }
}

export function checkEmail(fields: any) {
  return async (dispatch: any) => {
    dispatch({ type: IS_CHECKING_EMAIL });
    try {
      const result = await userApi.checkEmail(fields);
      dispatch({
        type: CHECK_EMAIL_SUCCESS,
      });
      return result;
    } catch (error: any) {
      console.log('Check email error: ', error);
      dispatch({
        type: CHECK_EMAIL_FAILURE,
        error: error?.message
      });
    }
  }
}

export function searchTagUsers(fields: any) {
  return async (dispatch: any) => {
    dispatch({ type: IS_SEARCHING_TAG_USERS });
    try {
      const result = await userApi.searchTagUsers(fields);
      dispatch({
        type: SEARCH_TAG_USERS_SUCCESS,
        tagUsers: result
      });
      return result;
    } catch (error: any) {
      console.log('Search tag users error: ', error);
      dispatch({
        type: SEARCH_TAG_USERS_FAILURE,
        error: error.message
      });
    }
  }
}
