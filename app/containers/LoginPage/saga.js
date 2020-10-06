import { call, put, takeLatest } from 'redux-saga/effects';

import { requestAxiosLogin } from 'utils/request';
import { message } from 'antd';
import { LOGIN } from './constants';
import { loginOK, loginNOK } from './actions';

export function* login({ username, password }) {
  const requestURL = '/inside/login';

  try {
    const res = yield call(requestAxiosLogin, 'post', requestURL, {
      username,
      password,
    });

    if (res && res.data) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', res.data.username);
      window.location.reload();
    } else if (res.result !== true) {
      message.error(res.message);
      return false;
    }
    yield put(loginOK(res.data));
  } catch (err) {
    yield put(loginNOK(err));
  }
  return true;
}

export default function* loginPageSaga() {
  yield takeLatest(LOGIN, login);
}
