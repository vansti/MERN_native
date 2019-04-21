import axios from 'axios';

import { 
  CLEAR_ERRORS, 
  CLEAR_SUCCESS,       
  GET_CURRENT_COURSES 
} from './types';

import config from './config';


// get curent user courses
export const getCurentCourse = () => dispatch => {
  axios
    .get(config.ADDRESS + '/api/courses/current')
    .then(res =>
      dispatch({
        type: GET_CURRENT_COURSES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CURRENT_COURSES,
        payload: {}
      })
    );
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

export const clearSuccess = () => {
  return {
    type: CLEAR_SUCCESS
  };
};
