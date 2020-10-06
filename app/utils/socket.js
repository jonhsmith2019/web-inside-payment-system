/* eslint-disable func-names */
/* eslint-disable no-console */
import socketIOClient from 'socket.io-client';

const token = localStorage.getItem('token');

const socket = {
  socketInstance: null,
  init() {
    const socketUrl = `${process.env.SOCKET_BASE_URL}/ws?token=${token}`;
    console.log(socketUrl);
    this.socketInstance = socketIOClient(socketUrl, {
      transports: ['polling', 'websocket'],
    });
    this.socketInstance.on('connect', function() {
      console.log('socket connect');
    });
    this.socketInstance.on('connect_error', function(e) {
      console.log(e);
      // localStorage.removeItem('user');
      // localStorage.removeItem('token');
      // window.location = '#/login';
    });
    this.socketInstance.on('reconnect_attempt', attempts => {
      console.log(`Try to reconnect at ${attempts} attempt(s).`);
    });
    this.socketInstance.on('disconnect', function() {
      console.log('socket disconnect');
      // localStorage.removeItem('user');
      // localStorage.removeItem('token');
      // window.location = '#/login';
    });
  },
  disconnect() {
    this.socketInstance.on('disconnect', function() {
      console.log('socket disconnect');
    });
  },
  emit(event, rData) {
    this.socketInstance.emit(event, { data: rData });
  },
  on(event) {
    return new Promise(resolve => {
      this.socketInstance.on(event, res => {
        resolve(res);
      });
    });
  },
};

export default socket;
