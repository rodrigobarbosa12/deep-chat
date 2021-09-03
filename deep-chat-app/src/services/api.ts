import { AxiosPromise } from 'axios';
import xhr from './xhr';

interface GenericObject {
  [key: string]: string | number
}

const sendMessage = (params: GenericObject): AxiosPromise => xhr
  .post('/send-message', params);

export default {
  sendMessage,
};
