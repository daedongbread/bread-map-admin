import { fetcher } from '../axios/fetcher';

export type LoginResponse = {
  data: {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiredDate: number;
  };
};

export type LoginRequest = {
  adminId: string;
  password: string;
};

type RefreshRequest = {
  accessToken: string;
  refreshToken: string;
};

const requestLogin = async ({ adminId, password }: LoginRequest): Promise<LoginResponse> => {
  const resp = await fetcher.post<LoginResponse>(`/admin/login`, {
    adminId,
    password,
  });
  return resp.data;
};

// 9/29 문의함. 새로 만들어주실 예정.
const requestRefresh = async ({ accessToken, refreshToken }: RefreshRequest) => {
  const resp = await fetcher.post<LoginResponse>('/user/auth/reissue', {
    accessToken,
    refreshToken,
  });

  return resp.data;
};

export { requestLogin, requestRefresh };
