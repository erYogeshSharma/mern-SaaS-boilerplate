import { createSlice } from "@reduxjs/toolkit";

type AppState = {
  error: string;
  isLoadingUsers: boolean;
};

const initialState: AppState = {
  error: "",
  isLoadingUsers: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = "";
    },
  },
  // extraReducers: (builder) => {},
});

export const { clearErrors } = appSlice.actions;
export default appSlice.reducer;
