import { createSlice } from "@reduxjs/toolkit";
import { signIn, signUp } from "./auth-api";

type AuthState = {
  user: AuthResponse;
  error: string;
  isAuthenticating: boolean;
};

const initialState: AuthState = {
  user: {} as AuthResponse,
  error: "",
  isAuthenticating: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = "";
    },
    signOut: (state) => {
      state = initialState;
      return state;
    },
  },
  extraReducers: (builder) => {
    //SIGNUP
    builder.addCase(signUp.pending, (state) => {
      state.error = "";
      state.isAuthenticating = true;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.isAuthenticating = false;
      console.log(action.payload);
      state.error = action.payload as string;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isAuthenticating = false;
      state.user = action.payload;
    });
    //signIn
    builder.addCase(signIn.pending, (state) => {
      state.error = "";
      state.isAuthenticating = true;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.isAuthenticating = false;
      state.error = action.payload as string;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isAuthenticating = false;
      state.user = action.payload;
    });
  },
});

export const { clearErrors, signOut } = authSlice.actions;
export default authSlice.reducer;
