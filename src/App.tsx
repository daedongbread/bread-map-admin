import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRequestRefresh } from '@/apis/auth/useRequestLogin';

import Routes from './constants/routes';
import usePath from './hooks/usePath';
import Route from './routes';
import { Storage, userStorage } from './utils';

const App = () => {
  const navigate = useNavigate();
  const { mutateAsync } = useRequestRefresh();
  const { getCurrPath } = usePath();

  // 추후 axios에서 처리하는걸로 변경하기
  React.useEffect(() => {
    const token = userStorage.getItem<{ accessToken: string; refreshToken: string }>(Storage.Token);
    if (token) {
      const { accessToken, refreshToken } = token;
      mutateAsync({ accessToken, refreshToken });
    } else {
      if (getCurrPath() !== Routes.LOGIN) {
        window.confirm('로그인이 필요합니다.');
      }
      navigate(Routes.LOGIN);
      // redirect... router 내부에 넣어야 실행가능
    }
  }, [mutateAsync]);

  return <Route />;
};

export default App;
