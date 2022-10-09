import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Storage, userStorage } from '@/utils';

export const reqSuccessFn = (config: AxiosRequestConfig) => {
  if (config.headers === undefined) {
    config.headers = {};
  }

  const token = userStorage.getItem(Storage.Token);
  if (token && token.accessToken) {
    config.headers['Authorization'] = `Bearer ${token.accessToken}`;
  }

  return config;
};

export const reqFailFn = (error: any) => {
  return Promise.reject(error);
};

export const resSuccessFn = (response: AxiosResponse) => {
  return {
    ...response.data,
  };
};

export const resFailFn = (error: any) => {
  return Promise.reject(error);
};
