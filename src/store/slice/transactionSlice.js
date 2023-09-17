import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/axios";

export const getBalance = createAsyncThunk(
  "transaction/getBalance",
  async (_, thunkAPI) => {
    try {
      const response = await baseUrl.get(`/balance`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        ...thunkAPI.getState().auth,
        message: error.response.data.message,
      });
    }
  }
);

export const newTopUp = createAsyncThunk(
  "transaction/newTopUp",
  async (payload, thunkAPI) => {
    try {
      const response = await baseUrl.post("/topup", payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        ...thunkAPI.getState().auth,
        message: error.response.data.message,
      });
    }
  }
);

export const newTransaction = createAsyncThunk(
  "transaction/newTransaction",
  async (payload, thunkAPI) => {
    try {
      const response = await baseUrl.post("/transaction", payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        ...thunkAPI.getState().auth,
        message: error.response.data.message,
      });
    }
  }
);

export const getTransactionHistory = createAsyncThunk(
  "transaction/getTransactionHistory",
  async (payload, thunkAPI) => {
    try {
      const response = await baseUrl.get(
        `/transaction/history?offset=${payload.offset}&limit=${payload.limit}`
      );
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
  balance: {
    data: null,
    isLogin: false,
    isLoading: false,
    message: "",
  },
  topup: {
    data: null,
    isLogin: false,
    isLoading: false,
    message: "",
  },
  transaction: {
    data: null,
    isLogin: false,
    isLoading: false,
    message: "",
  },
  history: {
    data: null,
    isLogin: false,
    isLoading: false,
    message: "",
  },
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBalance.pending, (state, action) => {
      state.balance.isLoading = true;
    });

    builder.addCase(getBalance.rejected, (state, action) => {
      state.balance.isLoading = false;
      state.balance.message = action.payload;
    });
    builder.addCase(getBalance.fulfilled, (state, action) => {
      state.balance.isLoading = false;
      state.balance.data = action.payload.data.balance;
      state.balance.message = action.payload.message;
    });
    builder.addCase(newTopUp.pending, (state, action) => {
      state.topup.isLoading = true;
    });

    builder.addCase(newTopUp.rejected, (state, action) => {
      state.topup.isLoading = false;
      state.topup.message = action.payload;
    });
    builder.addCase(newTopUp.fulfilled, (state, action) => {
      state.topup.isLoading = false;
      state.topup.data = action.payload.data;
      state.topup.message = action.payload.message;
    });
    builder.addCase(newTransaction.pending, (state, action) => {
      state.transaction.isLoading = true;
    });

    builder.addCase(newTransaction.rejected, (state, action) => {
      state.transaction.isLoading = false;
      state.transaction.message = action.payload;
    });
    builder.addCase(newTransaction.fulfilled, (state, action) => {
      state.transaction.isLoading = false;
      state.transaction.data = action.payload.data;
      state.transaction.message = action.payload.message;
    });
    builder.addCase(getTransactionHistory.pending, (state, action) => {
      state.history.isLoading = true;
    });

    builder.addCase(getTransactionHistory.rejected, (state, action) => {
      state.history.isLoading = false;
      state.history.message = action.payload;
    });
    builder.addCase(getTransactionHistory.fulfilled, (state, action) => {
      state.history.isLoading = false;
      state.history.data = action.payload.data;
      state.history.message = action.payload.message;
    });
  },
});
