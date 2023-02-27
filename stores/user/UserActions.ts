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
  SEARCH_POPULAR_USERS_FAILURE
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
        error: error?.message
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
        error: error?.message
      });
    }
  }
}

export function fetchFollowers(fields: object) {
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

export function fetchFollowings(fields: object) {
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
        popularUsers: result?.users
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
