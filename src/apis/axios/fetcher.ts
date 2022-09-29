import axios from 'axios';
import { reqFailFn, reqSuccessFn, resFailFn, resSuccessFn } from './interceptor';

const fetcher = axios.create({
  baseURL: import.meta.env.VITE_API_URI,
  withCredentials: true,
});

fetcher.interceptors.request.use(reqSuccessFn, reqFailFn);

fetcher.interceptors.response.use(resSuccessFn, resFailFn);

export { fetcher };
