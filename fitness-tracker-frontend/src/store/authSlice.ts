import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import appAxios from "src/services/appAxios";

import { RegisterFormData } from "src/pages/Register";
import { LoginFormData } from "src/pages/Login";
import { decodeToken } from "src/utils/jwtDecode";

// helper function to decode token for userId
const getUserIdFromToken = (token: string): string | null => {
  // returns userId or null
  const decodedToken = decodeToken(token);
  return decodedToken ? decodedToken.userId : null;
};

// helper function to decode token for user type
const getUserTypeFromToken = (token: string): string | null => {
  const decodedToken = decodeToken(token);
  return decodedToken ? decodedToken.userType : null;
};

// initialize userToken and userId from local storage
const userToken = localStorage.getItem("userToken") ?? null;
const userId = userToken ? getUserIdFromToken(userToken) : null;
const userType = userToken ? getUserTypeFromToken(userToken) : null;

const initialState = {
  loading: false,
  userInfo: null, // for user object
  userId: userId as string | null, // for storing the userId,
  userType: userType as string | null,
  userToken, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data: RegisterFormData, { rejectWithValue }) => {
    try {
      await appAxios.post("/auth/register", data);
    } catch (error: any) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (body: LoginFormData, { rejectWithValue }) => {
    try {
      const { data } = await appAxios.post("/auth/login", body);
      localStorage.setItem("userToken", data.jwt);
      return data;
    } catch (error: any) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken"); // deletes token from storage
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.userId = null; // reset userId
      state.userType = null; // reset userType
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(registerUser.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    }),
      builder.addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
    builder.addCase(login.fulfilled, (state, action: any) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.userToken = action.payload.jwt;
      state.userId = getUserIdFromToken(action.payload.jwt); // get userId from token
      state.userType = getUserTypeFromToken(action.payload.jwt);
    });
    builder.addCase(login.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
