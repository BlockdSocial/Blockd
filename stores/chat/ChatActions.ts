import {
  IS_CREATING_MESSAGE,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAILURE,
  IS_FETCHING_MESSAGES,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILURE
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
      console.log('Fetch messages error: ', error);
      dispatch({
        type: FETCH_MESSAGES_FAILURE,
        error: error.message
      });
    }
  }
}
