import {
  GET_USERS,
  USERS_LOADING,
  GET_APPROVE_LIST
} from '../actions/types';

const initialState = {
  student: null,
  users: {
    students:[],
    teachers:[]
  },
  approve_list: {
    enrollStudents: [],
    students: []
  },
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false        
      }
    case USERS_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_APPROVE_LIST:
      return {
        ...state,
        approve_list: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
