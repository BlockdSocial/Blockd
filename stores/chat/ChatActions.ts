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

// Api
import { chatApi } from '../../api';

export function createMessage(fields: any) {
  return async (dispatch: any) => {
    dispatch({ type: IS_CREATING_MESSAGE });
    try {
      await chatApi.createMessage(fields);
      dispatch({
        type: CREATE_MESSAGE_SUCCESS,
      });
    } catch (error: any) {
      console.log('Create message error: ', error);
      dispatch({
        type: CREATE_MESSAGE_FAILURE,
        error: error.message
      });
    }
  }
}

export function fetchMessages(fields: any) {
  return async (dispatch: any) => {
    dispatch({ type: IS_FETCHING_MESSAGES });
    try {
      const result = await chatApi.fetchMessages(fields);
      dispatch({
        type: FETCH_MESSAGES_SUCCESS,
        messages: result
      });
      return result;
    } catch (error: any) {
      console.log('Fetch messages error: ', error.message);
      dispatch({
        type: FETCH_MESSAGES_FAILURE,
        error: error.message
      });
    }
  }
}

export function createChat(fields: any) {
  return async (dispatch: any) => {
    dispatch({ type: IS_CREATING_CHAT });
    try {
      const result = await chatApi.createChat(fields);
      dispatch({ type: CREATE_CHAT_SUCCESS });
      return result;
    } catch (error: any) {
      console.log('Create chat error: ', error);
      dispatch({
        type: CREATE_CHAT_FAILURE,
        error: error.message
      });
    }
  }
}

export function deleteChat(fields: any) {
  return async (dispatch: any) => {
    dispatch({ type: IS_DELETING_CHAT });
    try {
      await chatApi.deleteChat(fields);
      dispatch({ type: DELETE_CHAT_SUCCESS });
    } catch (error: any) {
      console.log('Delete chat error: ', error);
      dispatch({
        type: DELETE_CHAT_FAILURE,
        error: error.message
      });
    }
  }
}

export function fetchChat() {
  return async (dispatch: any) => {
    dispatch({ type: IS_FETCHING_CHAT });
    try {
      const result = await chatApi.getChat();
      dispatch({
        type: FETCH_CHAT_SUCCESS,
        chat: result
      });
      return result;
    } catch (error: any) {
      console.log('Fetch chat error: ', error);
      dispatch({
        type: FETCH_CHAT_FAILURE,
        error: error.message
      });
    }
  }
}

export function muteChat(fields: any) {
  return async (dispatch: any) => {
    dispatch({ type: IS_MUTING_CHAT });
    try {
      await chatApi.muteChat(fields);
      dispatch({ type: MUTE_CHAT_SUCCESS });
    } catch (error: any) {
      console.log('Mute chat error: ', error);
      dispatch({
        type: MUTE_CHAT_FAILURE,
        error: error.message
      });
    }
  }
} 
