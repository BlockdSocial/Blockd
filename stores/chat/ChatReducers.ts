// Action types
import {
  IS_CREATING_MESSAGE,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAILURE,
  IS_FETCHING_MESSAGES,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILURE
} from './ChatActionTypes';

const initialState = {
  isCreatingMessage: false,
  isFetchingMessages: false,
  messages: [],
  error: '',
};

export function chatReducer(state = initialState, action: any) {
  switch (action.type) {
    case IS_CREATING_MESSAGE: {
      return {
        ...state,
        isCreatingMessage: true
      };
    }
    case CREATE_MESSAGE_SUCCESS: {
      return {
        ...state,
        isCreatingMessage: false
      };
    }
    case CREATE_MESSAGE_FAILURE: {
      return {
        ...state,
        isCreatingMessage: false,
        error: action.error
      };
    }
    case IS_FETCHING_MESSAGES: {
      return {
        ...state,
        isFetchingMessages: true,
      };
    }
    case FETCH_MESSAGES_SUCCESS: {
      return {
        ...state,
        isFetchingMessages: false,
        messages: action.messages
      };
    }
    case FETCH_MESSAGES_FAILURE: {
      return {
        ...state,
        isFetchingMessages: false,
        error: action.error
      };
    }
    default: {
      return state;
    }
  }
}
