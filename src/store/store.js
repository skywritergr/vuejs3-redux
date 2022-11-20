import { configureStore } from "@reduxjs/toolkit";

import { usersSlice } from "./users/userSlice";

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    devTools: true,
  },
});
