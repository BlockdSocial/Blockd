import {
  IS_FETCHING_USER_NOTIFICATIONS,
  FETCH_USER_NOTIFICATIONS_SUCCESS,
  FETCH_USER_NOTIFICATIONS_FAILURE,
  IS_FETCHING_USER_NOTIFICATION,
  FETCH_USER_NOTIFICATION_SUCCESS,
  FETCH_USER_NOTIFICATION_FAILURE,
  IS_READING_NOTIFICATION,
  READ_NOTIFICATION_SUCCESS,
  READ_NOTIFICATION_FAILURE
} from './NotificationActionTypes';

// Api
import { notificationApi } from '../../api';

export function fetchUserNotifications() {
  return async (dispatch: any) => {
    dispatch({ type: IS_FETCHING_USER_NOTIFICATIONS });
    try {
      const result: any = await notificationApi.fetchUserNotifications();
      dispatch({ 
        type: FETCH_USER_NOTIFICATIONS_SUCCESS,
        notifications: result,
      });
      return result;
    } catch (error: any) {
      console.log('Fetch User Notifications error: ', error);
      dispatch({
        type: FETCH_USER_NOTIFICATIONS_FAILURE,
        error: error.message
      });
    }
  }
}

export function fetchUserNotification(fields: any) {
  return async (dispatch: any) => {
    dispatch({ type: IS_FETCHING_USER_NOTIFICATION });
    try {
      
      const result = await notificationApi.fetchUserNotification(fields);
      console.log(result);
      dispatch({
        type: FETCH_USER_NOTIFICATION_SUCCESS,
        notification: result
      });
      return result;
    } catch (error: any) {
      console.log('Fetch User Notification error: ', error);
      dispatch({
        type: FETCH_USER_NOTIFICATION_FAILURE,
        error: error.message
      });
    }
  }
}

export function readNotification(fields: any) {
  return async (dispatch: any) => {
    dispatch({ type: IS_READING_NOTIFICATION });
    try {
      await notificationApi.readNotification(fields);
      dispatch({
        type: READ_NOTIFICATION_SUCCESS,
      });
    } catch (error: any) {
      console.log('Read Notification Error: ', error);
      dispatch({
        type: READ_NOTIFICATION_FAILURE,
        error: error.message
      });
    }
  }
}
