export interface GenericObject {
  [x: string]: string | number;
}

export interface Response {
  socketId: string;
  status: string;
  message: string;
  nickname?: string;
}

export interface User {
  socketId: string,
  nickname: string,
}

export interface Chat {
  hour: string;
  socketId: string;
  message: string;
  nickname: string;
}
