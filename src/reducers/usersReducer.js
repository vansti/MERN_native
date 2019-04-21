import {
  GET_USERS
} from '../actions/types';

const initialState = {
  student: null,
  users: null,
  approve_list: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      }
    default:
      return state;
  }
}
