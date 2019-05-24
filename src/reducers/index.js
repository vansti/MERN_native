import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import successReducer from './successReducer';
import profileReducer from './profileReducer';
import courseReducer from './courseReducer';
import exerciseReducer from './exerciseReducer';
import usersReducer from './usersReducer';
import commentReducer from './commentReducer';
import attendanceReducer from './attendanceReducer';
import pointReducer from './pointReducer';
import scheduleReducer from './scheduleReducer';
import lessonReducer from './lessonReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  success: successReducer,
  profile: profileReducer,
  courses: courseReducer,
  exercises: exerciseReducer,
  users: usersReducer,
  comments: commentReducer,
  attendance: attendanceReducer,
  point: pointReducer,
  schedule: scheduleReducer,
  lesson: lessonReducer
});
