// Action types
import {
  SET_AUTH_TOKEN,
  SET_API_KEY
} from './CredentialsActionTypes';

let initialState = {
  authToken: '',
  isLoadingAuthToken: true
};

export function credentialsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH_TOKEN: {
      return {
        ...state,
        authToken: action.authToken,
        isLoadingAuthToken: false
      };
    }
    default: {
      return state;
    }
  }
}
