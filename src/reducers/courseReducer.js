import {
  GET_CURRENT_COURSES,
  GET_ALL_COURSES,
  ALLCOURSE_LOADING,
  GET_COURSE_INFO,
  GET_MANAGE_COURSES
} from '../actions/types';

const initialState = {
  courseinfo: {
    course: {},
    course_detail: {}
  },
  allcourses: [],
  currentcourses: [],
  studentcourses: null,
  managecourses: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_COURSES:
      return {
        ...state,
        currentcourses: action.payload,
        loading: false
      };
    case GET_ALL_COURSES:
      return {
        ...state,
        allcourses: action.payload,
        loading: false
      };
    case ALLCOURSE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_COURSE_INFO:
      return {
        ...state,
        courseinfo: action.payload,
        loading: false
      };
    case GET_MANAGE_COURSES:
      return {
        ...state,
        managecourses: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
