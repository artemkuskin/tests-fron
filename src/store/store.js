import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";

const rootReducer = combineReducers({
  authReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
