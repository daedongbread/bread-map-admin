import { fetcher } from '@/apis/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  loading: boolean;
  error: boolean;
  id: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: UserState = {
  loading: false,
  error: false,
  id: null,
  accessToken: null,
  refreshToken: null,
};

// 비동기 작업이 여기서 필요한가?
// const login = createAsyncThunk('login', async ({ adminId, password }: LoginRequest) => {
//   // token expired 어떻게 체크?
//   const accessToken = storage.get(Storage.AccessToken);
//   const refreshToken = storage.get(Storage.RefreshToken);

//   if (!accessToken) {
//     // const { data } = await requestLogin({ adminId, password });
//     //  const { accessToken, refreshToken } = data;
//     // storage.set(Storage.AccessToken, accessToken);
//     // storage.set(Storage.RefreshToken, refreshToken);
//   }
//   return { adminId };
// });

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // updateUser(state, action: PayloadAction<Omit<UserState, 'loading'>>) {
    //   const { id, accessToken, refreshToken } = action.payload;
    //   state.id = id;
    //   state.accessToken = accessToken;
    //   state.refreshToken = refreshToken;
    // },
    // removeUser(state) {
    //   state.id = null;
    //   state.accessToken = null;
    //   state.refreshToken = null;
    // },
  },
  // extraReducers: builder => {
  //   builder.addCase(login.pending, (state, action) => {});
  //   builder.addCase(login.fulfilled, (state, action) => {
  //     action.payload.adminId;
  //   });
  // },
});

export default userSlice.reducer;
// export const { updateUser, removeUser } = userSlice.actions;
