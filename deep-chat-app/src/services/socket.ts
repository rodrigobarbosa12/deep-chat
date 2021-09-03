import socketio, { Socket } from 'socket.io-client';
import { API } from './xhr';

const socket = socketio(API, { autoConnect: false });

const subscribeToNotification = (subscribeFunction: (x: any) => void): Socket => socket
  .on('notification', subscribeFunction);

const showUsersOnline = (subscribeFunction: (x: any) => void): Socket => socket
  .on('users-online', subscribeFunction);

const subscribeToChat = (subscribeFunction: (x: any) => void): Socket => socket
  .on('chat', subscribeFunction);

const subscribeToAuth = (subscribeFunction: (x: any) => void): Socket => socket
  .on('auth', subscribeFunction);

const subscribeWarn = (subscribeFunction: (x: any) => void): Socket => socket
  .on('warn', subscribeFunction);

const disconnect = (): void => {
  if (socket.connected) {
    socket.disconnect();
  }
};

const connect = (nickname: string): void => {
  disconnect();

  socket.io.opts.query = {
    nickname,
  };

  socket.connect();
};

export {
  connect,
  disconnect,
  subscribeToChat,
  showUsersOnline,
  subscribeToNotification,
  subscribeToAuth,
  subscribeWarn,
};
