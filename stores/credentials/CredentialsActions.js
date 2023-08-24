// Action types
import { SET_AUTH_TOKEN } from './CredentialsActionTypes';

/**
 *
 */
export function setAuthToken(authToken) {
  return {
    type: SET_AUTH_TOKEN,
    authToken
  };
}
