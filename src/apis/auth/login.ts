import { loginStorage, Storage, userStorage } from '@/utils';
import { fetcher } from '../axios';

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiredDate: number;
};

export type LoginPayload = {
  email: string;
  password: string;
};

type RefreshRequest = {
  accessToken: string;
  refreshToken: string;
};

const saveUserToken = ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
  userStorage.setItem(Storage.Token, {
    accessToken,
    refreshToken,
  });
};

const rememberUser = ({ email, password }: { email: string; password: string }) => {
  loginStorage.setMultipleItems([
    [
      Storage.Form,
      {
        email,
        password,
      },
    ],
    [Storage.IsRemembered, true],
  ]);
};

const removeUser = () => {
  const form = loginStorage.getItem(Storage.Form);
  if (form) {
    loginStorage.removeItem(Storage.Form);
  }
  loginStorage.setItem(Storage.IsRemembered, false);
};

const requestLogin = async ({ email, password, isRemembered }: LoginPayload & { isRemembered: boolean }) => {
  const resp = await fetcher.post<LoginResponse>(`/login`, {
    email,
    password,
  });
  return { ...resp.data, email, password, isRemembered };
};

const requestRefresh = async ({ accessToken, refreshToken }: RefreshRequest) => {
  console.log('$$$ requestRefresh');
  const resp = await fetcher.post<LoginResponse>('/reissue', {
    accessToken,
    refreshToken,
  });

  return resp.data;
};

export { saveUserToken, rememberUser, removeUser, requestLogin, requestRefresh };
