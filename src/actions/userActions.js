import axios from 'axios';

import { GET_USERS, USERS_LOADING } from './types';
import config from './config';

// Get a list of users
export const getUsers = (courseid) => dispatch => {
  dispatch(setUsersLoading());
  axios
    .get(config.ADDRESS + '/api/users/get-users-in-course/' + courseid)
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USERS,
        payload: {}
      })
    );
};

export const setUsersLoading = () => {
  return {
    type: USERS_LOADING
  };
};