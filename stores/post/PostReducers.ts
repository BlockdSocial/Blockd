// Action types
import { 
  IS_CREATING_POST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
} from './PostActionTypes';

const initialState = { 
  error: '', 
  isCreatingPost: false,
};

export function postReducer(state = initialState, action: any) {
  switch (action.type) {
    case IS_CREATING_POST: {
      return {
        ...state,
        isCreatingPost: true
      };
    }
    case CREATE_POST_SUCCESS: {
      return {
        ...state,
        isCreatingPost: false
      };
    }
    case CREATE_POST_FAILURE: {
      return {
        ...state,
        error: action.error,
        isCreatingPost: false
      };
    }
    default: {
      return state;
    }
  }
}
