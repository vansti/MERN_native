import axios from 'axios';

import { GET_USERS, USERS_LOADING, GET_APPROVE_LIST, GET_SUCCESS, GET_ERRORS, CLEAR_SUCCESS } from './types';
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

// lấy danh sách học viên ghi danh và danh sách học viên dc duyệt của 1 khóa học
export const getApproveList = (courseId) => dispatch => {
  dispatch(setUsersLoading());
  axios
    .get(config.ADDRESS + '/api/users/approve-list/' + courseId)
    .then(res =>
      dispatch({
        type: GET_APPROVE_LIST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_APPROVE_LIST,
        payload: {}
      })
    );
};

// Approve Student to Course
export const approveStudent = (courseId, studentId) => dispatch => {
  axios
    .post(`${config.ADDRESS}/api/courses/approve/${courseId}/${studentId}`)
    .then(res =>{
      dispatch({
        type: GET_SUCCESS,
        payload: res.data
      })
      dispatch(getApproveList(courseId))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setUsersLoading = () => {
  return {
    type: USERS_LOADING
  };
};

export const clearSuccess = () => {
  return {
    type: CLEAR_SUCCESS
  };
};