import React from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Routes from '@/constants/routes';
import { Storage, userStorage } from '@/utils';
import { rememberUser, removeUser, requestLogin, requestRefresh, saveUserToken } from './login';

const EXPIRE_GAP = 2 * 60 * 1000;
const EXPIRED_DATE = 60 * 60 * 1000;

let REFRESH_TIME_OUT: ReturnType<typeof setTimeout> | null = null;

// 로그인 로직 axios로..
export const refreshTimeOut = (callBack: () => void, timeout?: number) => {
  if (REFRESH_TIME_OUT) {
    clearTimeout(REFRESH_TIME_OUT);
  }
  REFRESH_TIME_OUT = setTimeout(callBack, timeout || EXPIRED_DATE - EXPIRE_GAP);
};

export const useRequestRefresh = () => {
  const { data, mutateAsync, isLoading, isError } = useMutation(requestRefresh, {
    onSuccess: data => {
      const { accessToken, refreshToken } = data;
      saveUserToken({ accessToken, refreshToken });
      refreshTimeOut(() => mutateAsync(data));
    },
    onError: onErrorLogin,
    retry: false,
  });

  return {
    mutateAsync,
    data,
    loading: isLoading,
    error: isError,
    refetch: null,
  };
};

export const useAuth = () => {
  const navigate = useNavigate();

  const useRequestLogin = () => {
    const refresh = useRequestRefresh();
    const { data, mutate, isLoading, isError } = useMutation(requestLogin, {
      onSuccess: data => {
        const { accessToken, refreshToken, isRemembered, email, password } = data;
        saveUserToken({ accessToken, refreshToken });
        refreshTimeOut(() => refresh.mutateAsync({ accessToken, refreshToken }));

        if (isRemembered) {
          rememberUser({ email, password });
        } else {
          removeUser();
        }

        navigate(Routes.BAKERIES, { replace: true });
      },
      onError: onErrorLogin,
    });

    return {
      mutate,
      data,
      loading: isLoading,
      error: isError,
      refetch: null,
    };
  };

  const logout = () => {
    if (REFRESH_TIME_OUT) {
      clearTimeout(REFRESH_TIME_OUT);
    }
    userStorage.removeItem(Storage.Token);
    navigate(Routes.LOGIN, { replace: true });
  };

  return { login: useRequestLogin, logout };
};

const onErrorLogin = (error: unknown) => {
  console.log(error);
};
