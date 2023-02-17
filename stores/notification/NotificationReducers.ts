// Action types
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

const initialState = {
  isFetchingUserNotifications: false,
  isFetchingUserNotification: false,
  isReadingNotification: false,
  notification: {},
  notifications: [],
  unread: 0,
  error: '',
};

export function notificationReducer(state = initialState, action: any) {
  switch (action.type) {
    case IS_FETCHING_USER_NOTIFICATIONS: {
      return {
        ...state,
        isFetchingUserNotifications: true
      };
    }
    case FETCH_USER_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        isFetchingUserNotifications: false,
        notifications: action.notifications,
        unread: action.unread
      };
    }
    case FETCH_USER_NOTIFICATIONS_FAILURE: {
      return {
        ...state,
        isFetchingUserNotifications: false,
        error: action.error
      };
    }
    case IS_FETCHING_USER_NOTIFICATION: {
      return {
        ...state,
        isFetchingUserNotification: true
      };
    }
    case FETCH_USER_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        isFetchingUserNotification: false,
        notification: action.notification
      };
    }
    case FETCH_USER_NOTIFICATION_FAILURE: {
      return {
        ...state,
        isFetchingUserNotification: false,
        error: action.error
      };
    }
    case IS_READING_NOTIFICATION: {
      return {
        ...state,
        isReadingNotification: true
      };
    }
    case READ_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        isReadingNotification: false
      };
    }
    case READ_NOTIFICATION_FAILURE: {
      return {
        ...state,
        isReadingNotification: false,
        error: action.error
      };
    }
    default: {
      return state;
    }
  }
}
