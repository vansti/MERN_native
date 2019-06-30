import axios from 'axios';

import { 
  CLEAR_ERRORS, 
  CLEAR_SUCCESS,       
  GET_CURRENT_COURSES,
  GET_ALL_COURSES,
  ALLCOURSE_LOADING,
  GET_COURSE_INFO,
  GET_ERRORS,
  GET_SUCCESS,
  GET_MANAGE_COURSES,
  GET_STUDENT_COURSES
} from './types';

import config from '../config';


// get curent user courses
export const getCurentCourse = () => dispatch => {
  dispatch(setAllCourseLoading())
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

// lấy hết khóa học chưa hết hạn ghi danh
export const getAllCourse = () => dispatch => {
  dispatch(setAllCourseLoading())
  axios
    .get(config.ADDRESS + '/api/courses/all-course')
    .then(res =>
      dispatch({
        type: GET_ALL_COURSES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ALL_COURSES,
        payload: {}
      })
    );
};

// lấy thông tin chi tiết của 1 khóa học
export const getCourseInfo = (courseId) => dispatch => {
  dispatch(setAllCourseLoading())
  axios
    .get(`${config.ADDRESS}/api/courses/course-info/${courseId}`)
    .then(res =>
      dispatch({
        type: GET_COURSE_INFO,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_COURSE_INFO,
        payload: {}
      })
    );
};

// Enroll Course
export const enrollCourse = (courseId) => dispatch => {
  axios
    .post(config.ADDRESS + '/api/courses/enroll-course/' + courseId)
    .then(res =>{
      dispatch({
        type: GET_SUCCESS,
        payload: {data: 'Đã ghi danh thành công'}
      })
      dispatch(getCourseInfo(courseId))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Unenroll Course
export const unenrollCourse = (courseId) => dispatch => {
  axios
    .post(config.ADDRESS + '/api/courses/unenroll-course/' + courseId)
    .then(res =>{
      dispatch({
        type: GET_SUCCESS,
        payload: {data: 'Đã hủy ghi danh thành công'}
      })
      dispatch(getCourseInfo(courseId))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// lấy tất cả các khóa học
export const getManageCourses = () => dispatch => {
  dispatch(setAllCourseLoading())
  axios
    .get(`${config.ADDRESS}/api/courses/manage-courses`)
    .then(res =>
      dispatch({
        type: GET_MANAGE_COURSES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_MANAGE_COURSES,
        payload: {}
      })
    );
};

// join course
export const joinCourse = (courseId) => dispatch => {
  axios
    .post(config.ADDRESS + '/api/courses/join-course/' + courseId)
    .then(res =>{
      dispatch({
        type: GET_SUCCESS,
        payload: res.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// get student courses by student id
export const getStudentCourse = (studentId) => dispatch => {
  dispatch(setAllCourseLoading())
  axios
    .get(config.ADDRESS + '/api/courses/' + studentId)
    .then(res =>
      dispatch({
        type: GET_STUDENT_COURSES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_STUDENT_COURSES,
        payload: {}
      })
    );
};

export const setAllCourseLoading = () => {
  return {
    type: ALLCOURSE_LOADING
  };
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
