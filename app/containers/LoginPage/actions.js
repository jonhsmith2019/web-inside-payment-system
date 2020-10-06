/*
 *
 * LoginPage actions
 *
 */

import { LOGIN, LOGIN_NOK, LOGIN_OK } from './constants';

export function login(username, password) {
  return {
    type: LOGIN,
    username,
    password,
  };
}

export function loginOK(data) {
  return {
    type: LOGIN_OK,
    payload: data,
  };
}

export function loginNOK(data) {
  return {
    type: LOGIN_NOK,
    payload: data,
  };
}
