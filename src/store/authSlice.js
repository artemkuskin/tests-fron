import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RunTestService } from "../services/runTest-service";
import { CreateService } from "../services/create-service";
import { GetTestsService, RefreshService } from "../services/refresh-service";
import { StopService } from "../services/stop-service";
import { UserDataService } from "../services/userData-service";

const initialState = {
  isAuth: false,
  testData: [],
  status: "",
  isOpen: false,
};

export const runTest = createAsyncThunk("app/login", async ({ testName, name }) => {
  try {
    console.log(testName);
    const response = await RunTestService.runTest(testName, name);
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e.response?.data);
  }
});

export const refresh = createAsyncThunk("app/refresh", async () => {
  try {
    const response = await RefreshService.refresh();
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e.response?.data?.message);
  }
});

export const stopReprTest = createAsyncThunk("app/stop", async () => {
  try {
    const response = await StopService.stopReprTest();
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e.response?.data?.message);
  }
});

export const stopDocTest = createAsyncThunk("app/stop", async () => {
  try {
    const response = await StopService.stopDocTest();
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e.response?.data?.message);
  }
});

export const userData = createAsyncThunk("app/userData", async ({ firstName, lastName, id, id2 }) => {
  try {
    const response = await UserDataService.userData(firstName, lastName, id, id2);
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e.response?.data?.message);
  }
});

export const authSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    changeIsOpen(state, action) {
      state.isOpen = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
