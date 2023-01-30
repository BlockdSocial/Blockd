// Action types
import { 
  IS_UPDATING_PROFILE_PICTURE,
  UPDATE_PROFILE_PICTURE_SUCCESS,
  UPDATE_PROFILE_PICTURE_FAILURE,
} from './UserActionTypes';

const initialState = { 
  error: '', 
  isUpdatingProfilePicture: false,
};

export function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case IS_UPDATING_PROFILE_PICTURE: {
      return {
        ...state,
        isUpdatingProfilePicture: true
      };
    }
    case UPDATE_PROFILE_PICTURE_SUCCESS: {
      return {
        ...state,
        isUpdatingProfilePicture: false
      };
    }
    case UPDATE_PROFILE_PICTURE_FAILURE: {
      return {
        ...state,
        error: action.error,
        isUpdatingProfilePicture: false
      };
    }
    default: {
      return state;
    }
  }
}
