import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Storage, storage } from '@/utils';

export const reqSuccessFn = (config: AxiosRequestConfig) => {
  if (config.headers === undefined) {
    config.headers = {};
  }

  const accessToken = storage.get(Storage.AccessToken);
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
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
