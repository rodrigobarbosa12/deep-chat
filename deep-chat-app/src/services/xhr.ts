import axios from 'axios';

export const API = 'http://192.168.1.90:3334';

const xhr = axios.create({
  baseURL: API,
});

xhr.interceptors.response.use((response) => response, (error) => Promise.reject(error));

export default xhr;
