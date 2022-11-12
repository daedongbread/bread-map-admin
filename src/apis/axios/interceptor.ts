import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { GhRoutes } from '@/constants/routes';
import { rootNavigate } from '@/main';
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
  // 로그인을 하고, 화면을 끈다음에 다시 탭으로 간 경우
  // 첫 요청시 토큰만료가 되기때문에 리다이렉트 해줘야함.

  // error.code 체크? 요청할까?
  if (error.response.data.message === 'Invalid JWT') {
    window.confirm('장시간 사용하지않아 다시 로그인이 필요합니다.');
    rootNavigate(GhRoutes.LOGIN);
  } else {
    console.log('err:', error.response);
  }

  return Promise.reject(error);
};
