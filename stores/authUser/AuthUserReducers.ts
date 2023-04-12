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
  FETCH_USER_MESSAGE_FAILURE,
  IS_SENDING_VERIFICATION,
  SEND_VERIFICATION_SUCCESS,
  SEND_VERIFICATION_FAILURE,
  IS_GENERATING_TOKEN,
  GENERATE_TOKEN_SUCCESS,
  GENERATE_TOKEN_FAILURE
} from './AuthUserActionTypes';

const initialState = { 
  authError: '',
  message: '',
  isLoggingIn: false,
  isGeneratingToken: false,
  token: {},
  authUser: {}, 
  isLoggingOut: false, 
  isFetchingAuthUser: false, 
  isRegisteringUser: false, 
  isFetchingMessage: false,
  isSendingVerification: false
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
        authError: action.error
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
        authError: action.error,
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
        authError: action.error
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
        authError: action.error
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
        authError: action.error
      };
    }
    case IS_SENDING_VERIFICATION: {
      return {
        ...state,
        isSendingVerification: true
      };
    }
    case SEND_VERIFICATION_SUCCESS: {
      return {
        ...state,
        isSendingVerification: false
      };
    }
    case SEND_VERIFICATION_FAILURE: {
      return {
        ...state,
        isSendingVerification: false,
        error: action.error
      };
    }
    case IS_GENERATING_TOKEN: {
      return {
        ...state,
        isGeneratingToken: true
      };
    }
    case GENERATE_TOKEN_SUCCESS: {
      return {
        ...state,
        isGeneratingToken: false,
        token: action.token
      };
    }
    case GENERATE_TOKEN_FAILURE: {
      return {
        ...state,
        isGeneratingToken: false,
        error: action.error
      };
    }
    default: {
      return state;
    }
  }
}
