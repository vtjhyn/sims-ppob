import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/axios";

export const getProfileData = createAsyncThunk(
  "profile/data",
  async (payload, thunkAPI) => {
    try {
      const response = await baseUrl.get(`/profile`, payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        ...thunkAPI.getState().auth,
        message: error.response.data.message,
      });
    }
  }
);

export const updateProfileData = createAsyncThunk(
  "profile/update",
  async (payload, thunkAPI) => {
    try {
      const response = await baseUrl.put(`/profile/update`, payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        ...thunkAPI.getState().auth,
        message: error.response.data.message,
      });
    }
  }
);

export const updateProfileImage = createAsyncThunk(
  "profile/image",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("file", data);

      const binaryString = await readFileAsBinaryString(data);


      const response = await baseUrl.put(`/profile/image`, formData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        ...thunkAPI.getState().auth,
        message: error.response.data.message,
      });
    }
  }
);

function readFileAsBinaryString(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      resolve(event.target.result);
    };

    reader.onerror = (event) => {
      reject(event.target.error);
    };

    reader.readAsBinaryString(file);
  });
}

const initialState = {
  data: null,
  isLogin: false,
  isLoading: false,
  message: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileDataFromLocalStorage: (state) => {
      state.data = JSON.parse(localStorage.getItem("user"));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfileData.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getProfileData.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    });
    builder.addCase(getProfileData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      state.message = action.payload.message;


      localStorage.setItem("user", JSON.stringify(action.payload.data));
    });
    builder.addCase(updateProfileData.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(updateProfileData.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    });
    builder.addCase(updateProfileData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      state.message = action.payload.message;
    });
    builder.addCase(updateProfileImage.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(updateProfileImage.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    });
    builder.addCase(updateProfileImage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      state.message = action.payload.message;
    });
  },
});

export const { setProfileDataFromLocalStorage } = profileSlice.actions;
