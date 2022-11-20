import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    activeUsers: [
      {
        id: "1",
        name: "George Smith",
        gender: "male",
        email: "gsmith@george.net",
      },
    ],
  },
  reducers: {
    addUser: (state, action) => {
      state.activeUsers.push(action.payload);
    },
    updateUser: (state, action) => {
      const newArray = [
        action.payload,
        ...state.activeUsers.filter((user) => user.id === action.payload.id),
      ];
      state.activeUsers = newArray;
    },
  },
});

export const { addUser } = usersSlice.actions;

export const actions = usersSlice.actions;
