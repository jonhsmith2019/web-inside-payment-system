import React, { createContext } from 'react';
import socketIOClient from 'socket.io-client';
const WebSocketContext = createContext(null);

export { WebSocketContext };

// eslint-disable-next-line react/prop-types
export default ({ children }) => {
  let socket;
  const token = localStorage.getItem('token');
  if (!socket && token) {
    const socketUrl = `${process.env.SOCKET_BASE_URL}/ws?token=${token}`;
    socket = socketIOClient(socketUrl, {
      transports: ['polling', 'websocket'],
    });
    socket.on('connect', () => {
      console.log('socket connect');
    });
  }

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};
