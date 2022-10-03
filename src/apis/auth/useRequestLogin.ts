import { useMutation, useQuery } from 'react-query';
import { Storage, storage } from '@/utils';
import { fetcher } from '../axios/fetcher';

export type LoginResponse = {
  data: {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiredDate: number;
  };
};

export type LoginPayload = {
  email: string;
  password: string;
};

type RefreshRequest = {
  accessToken: string;
  refreshToken: string;
};

const requestLogin = async ({ email, password }: LoginPayload) => {
  const resp = await fetcher.post<LoginResponse>(`/login`, {
    email,
    password,
  });
  return resp.data.data;
};

// 9/29 문의함. 새로 만들어주실 예정.
const requestRefresh = async ({ accessToken, refreshToken }: RefreshRequest) => {
  const resp = await fetcher.post<LoginResponse>('/user/auth/reissue', {
    accessToken,
    refreshToken,
  });

  return resp.data;
};

const onSuccessLogin = (loginResponse: LoginResponse['data']) => {
  const { accessToken, refreshToken, accessTokenExpiredDate } = loginResponse;
  console.log('access', accessToken, 'refresh', refreshToken);
  storage.set(Storage.AccessToken, accessToken);
  storage.set(Storage.RefreshToken, refreshToken);
};

const onErrorLogin = (error: unknown) => {
  console.log(error);
};

const useRequestLogin = ({ successFn }: { successFn: () => void }) => {
  const { mutate, isLoading, isError } = useMutation(requestLogin, {
    onSuccess: () => {
      onSuccessLogin;
      successFn();
    },
    onError: onErrorLogin,
  });

  return {
    mutate,
    loading: false, //isLoading,
    error: false, // isError,
    refetch: null,
  };
};

export { useRequestLogin, requestRefresh };
