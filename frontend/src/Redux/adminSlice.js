import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import   AdminApi   from "../services/adminApi";

export const login = createAsyncThunk(
  "/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await AdminApi.post("/login", credentials);
      return data;
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    admin: JSON.parse(localStorage.getItem("admin")) || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.admin = null;
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
    },
  },
  extraReducers: (builder) => {
    //extraReducers is used to respond the three states pending, fullfilled, reject
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        const { admin } = payload
        console.log('payload :',admin)
        state.admin = admin;
        state.loading = false;
        state.token = payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { logout } = adminSlice.actions;
export default adminSlice.reducer;
