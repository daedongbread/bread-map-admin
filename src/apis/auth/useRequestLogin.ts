import React from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Routes from '@/constants/routes';
import { Storage, userStorage } from '@/utils';
import { rememberUser, removeUser, requestLogin, requestRefresh, saveUserToken } from './login';

const EXPIRE_GAP = 0; // 5 * 24 * 60 * 60 * 60;
const EXPIRED_DATE = 5000000; // 30 * 24 * 60 * 60 * 60;

let REFRESH_TIME_OUT: ReturnType<typeof setTimeout> | null = null;

const refreshTimeOut = (callBack: () => void, timeout?: number) => {
  if (REFRESH_TIME_OUT) {
    clearTimeout(REFRESH_TIME_OUT);
  }
  // REFRESH_TIME_OUT = setTimeout(callBack, timeout || EXPIRED_DATE - EXPIRE_GAP * 1000);
  REFRESH_TIME_OUT = setTimeout(callBack, 5000);
};

export const useAuth = () => {
  const navigate = useNavigate();

  const useRequestLogin = () => {
    const refresh = useRequestRefresh();
    const { data, mutate, isLoading, isError } = useMutation(requestLogin, {
      onSuccess: data => {
        const { accessToken, refreshToken, isRemembered, email, password } = data;
        saveUserToken({ accessToken, refreshToken }); // storage 저장
        refreshTimeOut(() => refresh.mutateAsync({ accessToken, refreshToken })); // refresh token 타임아웃 설정
        if (isRemembered) {
          rememberUser({ email, password });
        } else {
          removeUser();
        }

        navigate(Routes.BAKERIES);
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

  const useRequestRefresh = () => {
    console.log('useRequestRefresh init...');
    const { data, mutate, mutateAsync, isLoading, isError } = useMutation(requestRefresh, {
      onSuccess: data => {
        const { accessToken, refreshToken } = data;
        saveUserToken({ accessToken, refreshToken });
        console.log('useRequestRefresh success...');
        refreshTimeOut(() => mutateAsync(data));
      },
      onError: onErrorLogin,
    });

    return {
      mutate,
      mutateAsync,
      data,
      loading: isLoading,
      error: isError,
      refetch: null,
    };
  };

  // Logout redirect 필요
  const logout = () => {
    if (REFRESH_TIME_OUT) {
      clearTimeout(REFRESH_TIME_OUT);
    }

    userStorage.removeItem(Storage.Token);
    // storage.remove(Storage.AccessToken);
    // storage.remove(Storage.RefreshToken);
    // storage.remove(Storage.TokenExpiredDate);
  };

  // err: Hooks can only be called inside of the body of a function component.
  // React.useEffect(() => {
  //   const accessToken = storage.get(Storage.AccessToken);
  //   const refreshToken = storage.get(Storage.RefreshToken);
  //   if (accessToken && refreshToken) {
  //     const refresh = useRequestRefresh();
  //     refreshTimeOut(() => refresh.mutateAsync({ accessToken, refreshToken }));
  //   } else {
  //     window.confirm('로그인이 필요합니다.');
  //     // navigate(Routes.LOGIN);
  //   }
  // }, [useRequestRefresh().mutateAsync]);

  return { login: useRequestLogin, logout };
};

const onErrorLogin = (error: unknown) => {
  console.log(error);
};

// export { useRequestLogin };
