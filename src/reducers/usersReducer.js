import {
  GET_USERS,
  USERS_LOADING
} from '../actions/types';

const initialState = {
  student: null,
  users: {
    students:[],
    teachers:[]
  },
  approve_list: null,
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
    default:
      return state;
  }
}
