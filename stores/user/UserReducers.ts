// Action types
import { 
  IS_UPDATING_PROFILE_PICTURE,
  UPDATE_PROFILE_PICTURE_SUCCESS,
  UPDATE_PROFILE_PICTURE_FAILURE,
  IS_UPDATING_PROFILE_BANNER,
  UPDATE_PROFILE_BANNER_SUCCESS,
  UPDATE_PROFILE_BANNER_FAILURE
} from './UserActionTypes';

const initialState = { 
  error: '', 
  isUpdatingProfilePicture: false,
  isUpdatingProfileBanner: false
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
    case IS_UPDATING_PROFILE_BANNER: {
      return {
        ...state,
        isUpdatingProfileBanner: true
      };
    }
    case UPDATE_PROFILE_BANNER_SUCCESS: {
      return {
        ...state,
        isUpdatingProfileBanner: false
      };
    }
    case UPDATE_PROFILE_BANNER_FAILURE: {
      return {
        ...state,
        isUpdatingProfileBanner: false,
        error: action.error
      };
    }
    default: {
      return state;
    }
  }
}
