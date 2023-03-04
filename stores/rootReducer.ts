// Libraries
import { combineReducers } from 'redux';

// Reducers
import { authUserReducer } from './authUser/AuthUserReducers';
import { credentialsReducer } from './credentials/CredentialsReducers';
import { commentReducer } from './comment/CommentReducers';
import { postReducer } from './post/PostReducers';
import { notificationReducer } from './notification/NotificationReducers';
import { userReducer } from './user/UserReducers';
import { chatReducer } from './chat/ChatReducers';

const rootReducers = combineReducers({
	authUserReducer,
	credentialsReducer,
	commentReducer,
	postReducer,
	notificationReducer,
	userReducer,
	chatReducer
});

export default rootReducers;
