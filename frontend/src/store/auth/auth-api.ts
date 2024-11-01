import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api";

export const signUp = createAsyncThunk<AuthResponse, SignUpForm>(
  "auth/sign_up",
  async (form, { rejectWithValue }) => {
    try {
      const { data } = await API.sign_up(form);
      localStorage.setItem("token", JSON.stringify(data.data?.tokens));
      return data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  }
);
export const signIn = createAsyncThunk<AuthResponse, SignInForm>(
  "auth/sign_in",
  async (form, { rejectWithValue }) => {
    try {
      const { data } = await API.sing_in(form);
      localStorage.setItem("token", JSON.stringify(data.data?.tokens));
      return data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  }
);
