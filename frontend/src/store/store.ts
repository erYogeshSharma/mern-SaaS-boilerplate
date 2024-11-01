import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import authSlice from "./auth/auth.slice";
import appSlice from "./app/app.silce";

const reducers = combineReducers({
  auth: authSlice,
  app: appSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "app"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
