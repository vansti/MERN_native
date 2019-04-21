import axios from 'axios';
import config from './config';
import { GET_EXERCISE_LIST, CLEAR_SUCCESS, CLEAR_ERRORS } from './types';


export const getExerciseList = (courseId) => dispatch => {
  axios
    .get(`${config.ADDRESS}/api/exercises/${courseId}`)
    .then(res =>
      dispatch({
        type: GET_EXERCISE_LIST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EXERCISE_LIST,
        payload: {}
      })
    );
};

export const clearSuccess = () => {
  return {
    type: CLEAR_SUCCESS
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};