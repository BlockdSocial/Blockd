// Action types
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
  IS_FETCHING_AUTH_USER,
  FETCH_AUTH_USER_SUCCESS,
  FETCH_AUTH_USER_FAILURE,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  FETCH_USER_MESSAGE,
  FETCH_USER_MESSAGE_SUCCESS,
  FETCH_USER_MESSAGE_FAILURE
} from './AuthUserActionTypes';

const initialState = { 
  error: '',
  message: '',
  isLoggingIn: false, 
  authUser: {}, 
  isLoggingOut: false, 
  isFetchingAuthUser: false, 
  isRegisteringUser: false, 
  isFetchingMessage: false,
};

export function authUserReducer(state = initialState, action: any) {
  switch (action.type) {
    case IS_FETCHING_AUTH_USER: {
      return {
        ...state,
        isFetchingAuthUser: true
      };
    }
    case FETCH_AUTH_USER_SUCCESS: {
      console.log('non',action.user )
      return {
        ...state,
        isFetchingAuthUser: false,
        authUser: action.user
      };
    }
    case FETCH_AUTH_USER_FAILURE: {
      return {
        ...state,
        isFetchingAuthUser: false,
        error: action.error
      };
    }
    case LOGIN_USER: {
      return {
        ...state,
        isLoggingIn: true
      };
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        authUser: action.user,
        isLoggingIn: false
      };
    }
    case LOGIN_USER_FAILURE: {
      return {
        ...state,
        error: action.error,
        isLoggingIn: false
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        isLoggingOut: true
      };
    }
    case LOGOUT_USER_SUCCESS: {
      return {
        ...state,
        isLoggingOut: false,
        authUser: {}
      };
    }
    case LOGOUT_USER_FAILURE: {
      return {
        ...state,
        isLoggingOut: false,
        error: action.error
      };
    }
    case REGISTER_USER: {
      return {
        ...state,
        isRegisteringUser: true
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        isRegisteringUser: false
      };
    }
    case REGISTER_USER_FAILURE: {
      return {
        ...state,
        isRegisteringUser: false,
        error: action.error
      };
    }
    case FETCH_USER_MESSAGE: {
      return {
        ...state,
        isFetchingMessage: true,
      }
    }
    case FETCH_USER_MESSAGE_SUCCESS: {
      return {
        ...state,
        isFetchingMessage: false,
        message: action.message
      };
    }
    case FETCH_USER_MESSAGE_FAILURE: {
      return {
        ...state,
        isFetchingMessage: false,
        error: action.error
      };
    }
    default: {
      return state;
    }
  }
}
