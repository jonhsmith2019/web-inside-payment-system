import { take, put, call, fork, takeLatest } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { GET_TELCO, EVENT_SOCKET_GET_TELCO } from './constants';
import { getTelcoSuccess } from './actions';

let socket;

function* readTelco() {
  const channel = yield call(subscribeTelco);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export function* subscribeTelco() {
  return eventChannel(emit => {
    socket.emit(EVENT_SOCKET_GET_TELCO);
    socket.on(EVENT_SOCKET_GET_TELCO, res => {
      const resParsed = JSON.parse(res);
      emit(getTelcoSuccess(resParsed.data));
    });

    return () => {};
  });
}

export function* getTelco({ ws }) {
  socket = ws;
  yield fork(readTelco);
}

// Individual exports for testing
export default function* telcoSaga() {
  yield takeLatest(GET_TELCO, getTelco);
}
