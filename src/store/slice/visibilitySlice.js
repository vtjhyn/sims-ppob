import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemVisible: {},
};

const visibilitySlice = createSlice({
  name: "visibilitySlice",
  initialState,
  reducers: {
    toggleFieldVisibility: (state, action) => {
      const { fieldId } = action.payload;
      state.itemVisible[fieldId] = !state.itemVisible[fieldId];
    },
  },
});

export const { toggleFieldVisibility } = visibilitySlice.actions;
export default visibilitySlice.reducer;
