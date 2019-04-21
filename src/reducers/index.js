import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import successReducer from './successReducer';
import profileReducer from './profileReducer';
import courseReducer from './courseReducer';
import exerciseReducer from './exerciseReducer';
import usersReducer from './usersReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  success: successReducer,
  profile: profileReducer,
  courses: courseReducer,
  exercises: exerciseReducer,
  users: usersReducer
});
