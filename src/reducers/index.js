import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import successReducer from './successReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  success: successReducer
});
