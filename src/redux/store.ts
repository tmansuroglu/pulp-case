import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import playgroundReducers from "./reducers";

export const store = configureStore({
  reducer: {
    playgroundState: playgroundReducers,
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
