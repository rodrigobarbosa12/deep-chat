import { Server, Socket } from 'socket.io';
import {
  User,
  Chat,
  GenericObject,
  Response,
} from './@types/type';

let io: Server;

let users: User[] = [];

let chat: Chat[] = [];

const disconnectUser = (socketId: string): void => {
  users = users.filter((connection) => connection.socketId !== socketId);
};

const sendMessagesForUsersOnline = (): void => {
  users.forEach((connection) => {
    io.to(connection.socketId).emit('chat', chat);
  });
};

export const setMessageInChat = (message: Chat): void => {
  chat.push(message);
  sendMessagesForUsersOnline();
};

const verifyNicknameInUse = (nickName: string): User[] => users
  .filter((connection) => connection.nickname === nickName);

const notifyUsersOnline = (to: User[], data: GenericObject): void => {
  to.forEach((connection) => {
    io.to(connection.socketId).emit('notification', data);
  });
};

const showUsersOnline = (): void => {
  users.forEach((connection) => {
    io.to(connection.socketId).emit('users-online', users);
  });
};

const sendResponseUser = ({
  socketId,
  status,
  nickname,
  message,
}: Response): void => {
  io.to(socketId).emit(status, { message, nickname, socketId });
};

const startWebsocket = (server: Server): void => {
  io = server;

  io.sockets.on('connection', (socket: Socket) => {
    socket.on('disconnect', () => {
      disconnectUser(socket.id);
      showUsersOnline();

      if (!users.length) {
        chat = [];
      }
    });

    let { nickname } = socket.handshake.query;
    const { id: socketId } = socket;

    if (!nickname) {
      sendResponseUser({
        socketId,
        status: 'warn',
        message: 'Nickname is mandatory',
      });
      return;
    }

    nickname = typeof nickname === 'object' ? nickname[0] : nickname;

    if (verifyNicknameInUse(nickname).length) {
      sendResponseUser({
        socketId,
        status: 'warn',
        message: 'Nickname in use',
      });
      return;
    }

    sendResponseUser({
      socketId,
      status: 'auth',
      nickname,
      message: 'Seja bem-vindo',
    });
    notifyUsersOnline(users, { message: `${nickname} is online` });

    users.push({ socketId, nickname });
    showUsersOnline();
    sendMessagesForUsersOnline();
  });
};

export default startWebsocket;
