// Libraries
import { combineReducers } from 'redux';

// Reducers
import { authUserReducer } from './authUser/AuthUserReducers';
import { credentialsReducer } from './credentials/CredentialsReducers';

const rootReducers = combineReducers({
	authUserReducer,
	credentialsReducer,
});

export default rootReducers;
