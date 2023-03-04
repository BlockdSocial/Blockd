// Action types
import {
  IS_CREATING_MESSAGE,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAILURE,
  IS_FETCHING_MESSAGES,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILURE,
  IS_CREATING_CHAT,
  CREATE_CHAT_SUCCESS,
  CREATE_CHAT_FAILURE,
  IS_DELETING_CHAT,
  DELETE_CHAT_SUCCESS,
  DELETE_CHAT_FAILURE,
  IS_FETCHING_CHAT,
  FETCH_CHAT_SUCCESS,
  FETCH_CHAT_FAILURE,
  IS_MUTING_CHAT,
  MUTE_CHAT_SUCCESS,
  MUTE_CHAT_FAILURE
} from './ChatActionTypes';

const initialState = {
  isCreatingMessage: false,
  isFetchingMessages: false,
  isCreatingChat: false,
  isDeletingChat: false,
  isFetchingChat: false,
  isMutingChat: false,
  chats: [],
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
    case IS_CREATING_CHAT: {
      return {
        ...state,
        isCreatingChat: true,
      };
    }
    case CREATE_CHAT_SUCCESS: {
      return {
        ...state,
        isCreatingChat: false
      };
    }
    case CREATE_CHAT_FAILURE: {
      return {
        ...state,
        isCreatingChat: false,
        error: action.error
      };
    }
    case IS_DELETING_CHAT: {
      return {
        ...state,
        isDeletingChat: true,
      };
    }
    case DELETE_CHAT_SUCCESS: {
      return {
        ...state,
        isDeletingChat: false
      };
    }
    case DELETE_CHAT_FAILURE: {
      return {
        ...state,
        isDeletingChat: false,
        error: action.error
      };
    }
    case IS_FETCHING_CHAT: {
      return {
        ...state,
        isFetchingChat: true
      };
    }
    case FETCH_CHAT_SUCCESS: {
      return {
        ...state,
        isFetchingChat: false,
        chats: action.chat
      };
    }
    case FETCH_CHAT_FAILURE: {
      return {
        ...state,
        isFetchingChat: false,
        error: action.error
      };
    }
    case IS_MUTING_CHAT: {
      return {
        ...state,
        isMutingChat: true
      };
    }
    case MUTE_CHAT_SUCCESS: {
      return {
        ...state,
        isMutingChat: false
      };
    }
    case MUTE_CHAT_FAILURE: {
      return {
        ...state,
        isMutingChat: false,
        error: action.error
      };
    }
    default: {
      return state;
    }
  }
}
