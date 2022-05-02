import { createReducer, createActions } from 'reduxsauce';
import storage from '../libs/storage';
import apisauce from 'apisauce';

/* --------------------- Types and Action Creators ---------------- */
const { Types, Creators } = createActions({
  setUsername: ['username'],
});

Creators.login = (email, password) => {
  return async dispatch => {
    const api = apisauce.create({
      baseURL: 'http://localhost:8000/',
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'json'
    });
    const resp = await api.post('login', {
      email: email,
      password: password
    });
  
    if (resp.ok) {
      console.log(resp.data);
      storage.set('username', resp.data['username']);
      dispatch(Creators.setUsername(resp.data['username']));
      return resp.data;
    } else {
      alert('There was problem login');
      return resp.data;
    }
  };
};

Creators.signup = (email, username, password) => {
  return async dispatch => {
    const api = apisauce.create({
      baseURL: 'http://localhost:8000/',
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'json'
    });

    const resp = await api.post('signup', {
      email: email,
      username: username,
      password: password
    });
  
    if (resp.ok) {
      storage.set('username', username);
      dispatch(Creators.setUsername(username));
      return resp.data;
    } else {
      alert('There was problem Signup');
      return resp.data;
    }
  };
};

Creators.logout = () => {
  return dispatch => {
    storage.remove('username');
    dispatch(Creators.setUsername(null));
  };
};

export const AuthTypes = Types;

export default Creators;

/* --------------------- Selectors ---------------- */
export const AuthSelectors = {
  selectUsername: state => state.auth.username,
};

/* --------------------- Initial State ----------------- */
export const INITIAL_STATE = {
  username: null,
};

/* ------------------- Reducers --------------------- */
export const setUsername = (state, { username }) => ({
  ...state,
  username
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_USERNAME]: setUsername,
});
