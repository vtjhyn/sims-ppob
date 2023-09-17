import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./slice/authSlice";
import { assetsSlice } from "./slice/assetsSlice";
import { profileSlice } from "./slice/profileSlice";
import visibilitySliceReducer from "./slice/visibilitySlice";
import { transactionSlice } from "./slice/transactionSlice";

const reducers = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [assetsSlice.name]: assetsSlice.reducer,
  [profileSlice.name]: profileSlice.reducer,
  [transactionSlice.name]: transactionSlice.reducer,
  visibilitySlice: visibilitySliceReducer,
});

export default reducers;
