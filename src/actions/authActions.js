import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { AsyncStorage, Platform } from 'react-native';
import { GET_ERRORS, SET_CURRENT_USER, CLEAR_ERRORS } from './types';

// Register User
export const registerUser = (userData) => dispatch => {
  axios
    .post('http://192.168.1.103:5000/api/users/register', userData)
    .then(res => console.log(res.data))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  // console.log(userData)
  axios
    .post('http://192.168.1.103:5000/api/users/login', userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      AsyncStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
    
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from Storage
  signOutAsync = async () => {
    Platform.OS === 'ios' ? await AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove) : await AsyncStorage.clear();
  };
  signOutAsync();
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
