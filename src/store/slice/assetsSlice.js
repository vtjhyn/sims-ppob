import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/axios";

export const serviceData = createAsyncThunk(
  "assets/services",
  async (payload, thunkAPI) => {
    try {
      const response = await baseUrl.get(`/services`, payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        ...thunkAPI.getState().auth,
        message: error.response.data.message,
      });
    }
  }
);

export const bannerData = createAsyncThunk(
  "assets/banner",
  async (payload, thunkAPI) => {
    try {
      const response = await baseUrl.get(`/banner`, payload);
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
  banners: {
    data: null,
    isLoading: false,
    message: "",
  },
  services: {
    data: null,
    isLoading: false,
    message: "",
  },
};

export const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(bannerData.pending, (state, action) => {
      state.banners.isLoading = true;
    });

    builder.addCase(bannerData.rejected, (state, action) => {
      state.banners.isLoading = false;
      state.banners.message = action.payload;
    });
    builder.addCase(bannerData.fulfilled, (state, action) => {
      state.banners.isLoading = false;
      state.banners.data = action.payload.data;
      state.banners.message = action.payload.message;
    });
    builder.addCase(serviceData.pending, (state, action) => {
      state.services.isLoading = true;
    });

    builder.addCase(serviceData.rejected, (state, action) => {
      state.services.isLoading = false;
      state.services.message = action.payload;
    });
    builder.addCase(serviceData.fulfilled, (state, action) => {
      state.services.isLoading = false;
      state.services.data = action.payload.data;
      state.services.message = action.payload.message;
    });
  },
});
