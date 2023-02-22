import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import AuthSlice from './reducers/AuthSlice';
import  SchemaSlice  from './reducers/SchemaSlice';

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    schema:SchemaSlice,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
