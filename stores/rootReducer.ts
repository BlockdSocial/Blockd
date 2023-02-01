// Libraries
import { combineReducers } from 'redux';

// Reducers
import { authUserReducer } from './authUser/AuthUserReducers';
import { credentialsReducer } from './credentials/CredentialsReducers';
import { commentReducer } from './comment/CommentReducers';
import { postReducer } from './post/PostReducers';

const rootReducers = combineReducers({
	authUserReducer,
	credentialsReducer,
	commentReducer,
	postReducer
});

export default rootReducers;
