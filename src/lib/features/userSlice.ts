import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: null,
    pendingTransactions: null
  },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload.user;
       state.pendingTransactions = action.payload.pendingTransactions;
    },  updateUser: (state, action) => {

    },
     setUserData: (state, action) => {
      state.value = action.payload.user;
       state.pendingTransactions = action.payload.pendingTransactions;
    },
  },
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;

export const fetchUser = createAsyncThunk("user/setUser", async (response) => {
  // const response = await axios.get("/api/getUser");
  return response;
});
export const updateUser = createAsyncThunk("user/updateUser", async (response) => {
 console.log(response, "efvsvds")
  return response;
});



 