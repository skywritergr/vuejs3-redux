import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk("getUsers", async () => {
  const usersPromise = await fetch("https://gorest.co.in/public/v2/users", {
    headers: new Headers({
      Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`,
    }),
  });
  const users = await usersPromise.json();
  return users;
});

export const addUser = createAsyncThunk("addUser", async (user) => {
  const updatedRowPromise = await fetch(
    "https://gorest.co.in/public/v2/users",
    {
      method: "POST",
      body: JSON.stringify(user),
      headers: new Headers({
        Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    }
  );
  const newRow = await updatedRowPromise.json();
  return newRow;
});

export const updateUser = createAsyncThunk("updateUser", async (user) => {
  console.log("updating", user);
  const updatedRowPromise = await fetch(
    `https://gorest.co.in/public/v2/users/${user.id}`,
    {
      method: "PATCH",
      body: JSON.stringify(user),
      headers: new Headers({
        Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    }
  );
  const newRow = await updatedRowPromise.json();
  return newRow;
});
