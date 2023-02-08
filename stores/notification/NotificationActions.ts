import {
  IS_FETCHING_USER_NOTIFICATIONS,
  FETCH_USER_NOTIFICATIONS_SUCCESS,
  FETCH_USER_NOTIFICATIONS_FAILURE,
  IS_FETCHING_USER_NOTIFICATION,
  FETCH_USER_NOTIFICATION_SUCCESS,
  FETCH_USER_NOTIFICATION_FAILURE
} from './NotificationActionTypes';

// Api
import { notificationApi } from '../../api';

export function fetchUserNotifications(fields: object) {
  return async (dispatch: any) => {
    dispatch({ type: IS_FETCHING_USER_NOTIFICATIONS });
    try {
      const result = await notificationApi.fetchUserNotifications(fields);
      dispatch({ 
        type: FETCH_USER_NOTIFICATIONS_SUCCESS,
        notifications: result
      });
      return result;
    } catch (error: any) {
      console.log('Fetch User Notifications error: ', error);
      dispatch({
        type: FETCH_USER_NOTIFICATIONS_FAILURE,
        error: error
      });
    }
  }
}

export function fetchUserNotification(fields: string) {
  return async (dispatch: any) => {
    dispatch({ type: IS_FETCHING_USER_NOTIFICATION });
    try {
      const result = await notificationApi.fetchUserNotification(fields);
      dispatch({
        type: FETCH_USER_NOTIFICATION_SUCCESS,
        notification: result
      });
      return result;
    } catch (error: any) {
      console.log('Fetch User Notification error: ', error);
      dispatch({
        type: FETCH_USER_NOTIFICATION_FAILURE,
        error: error
      });
    }
  }
}
