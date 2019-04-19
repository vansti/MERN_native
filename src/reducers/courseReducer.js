import {
  GET_CURRENT_COURSES
} from '../actions/types';

const initialState = {
  courseinfo: {
    course: {},
    course_detail: {}
  },
  allcourses: [],
  currentcourses: null,
  studentcourses: null,
  managecourses: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_COURSES:
      return {
        ...state,
        currentcourses: action.payload,
      };
    default:
      return state;
  }
}
