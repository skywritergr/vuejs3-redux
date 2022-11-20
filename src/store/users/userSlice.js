import { createSlice } from "@reduxjs/toolkit";
import { getUsers, addUser, updateUser } from "./userService";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    activeUsers: [],
  },
  extraReducers: {
    [getUsers.fulfilled]: (state, action) => {
      state.activeUsers.push(...action.payload);
    },
    [addUser.fulfilled]: (state, action) => {
      state.activeUsers = [action.payload, ...state.activeUsers];
    },
    [updateUser.fulfilled]: (state, action) => {
      const newArray = [
        action.payload,
        ...state.activeUsers.filter((user) => user.id !== action.payload.id),
      ];
      state.activeUsers = newArray;
    },
  },
});
