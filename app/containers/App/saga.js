import { take, put, call, fork, takeLatest } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { GET_MENU, EVENT_SOCKET_GET_MENU } from './constants';
import { getMenuSuccess } from './actions';

let socket;

function* readMenu() {
  const channel = yield call(subscribeMenu);
  while (true) {
    const action = yield take(channel);
    // console.log('action', action);
    yield put(action);
  }
}

export function* subscribeMenu() {
  return eventChannel(emit => {
    // console.log('socket listening on get messages');
    // socket.on(EVENT_SOCKET_GET_MENU).then(res => {
    //   const resParsed = JSON.parse(res);
    //   emit(getMenuSuccess(resParsed.data));
    // });

    socket.emit(EVENT_SOCKET_GET_MENU);
    socket.on(EVENT_SOCKET_GET_MENU, res => {
      const resParsed = JSON.parse(res);
      emit(getMenuSuccess(resParsed.data));
    });

    return () => {};
  });
}

export function* getMenu({ ws }) {
  socket = ws;
  yield fork(readMenu);
}

// Individual exports for testing
export default function* appSaga() {
  yield takeLatest(GET_MENU, getMenu);
}
