import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './slices';

const reducer = combineReducers({
  user: userSlice,
});

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
