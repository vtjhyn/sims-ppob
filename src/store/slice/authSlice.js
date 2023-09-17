import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/axios";
import { sessionSet } from "../../utils/session";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload, thunkAPI) => {
    try {
      const response = await baseUrl.post(`/registration`, payload, {
        authorization: false,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        ...thunkAPI.getState().auth,
        message: error.response.data.message,
      });
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, thunkAPI) => {
    try {
      const response = await baseUrl.post(`/login`, payload, {
        authorization: false,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        ...thunkAPI.getState().auth,
        message: error.response.data.message,
      });
    }
  }
);

const initialState = {
  data: null,
  isLogin: false,
  isLoading: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      state.message = action.payload.message;
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLogin = true;
      state.data = action.payload.data;
      state.message = action.payload.message;
      sessionSet('token', action.payload.data.token, 720)
    });
  },
});
