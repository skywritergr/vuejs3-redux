import { defineStore } from "pinia";

export const useUserStore = defineStore("users", {
  state: () => ({
    users: [],
  }),
  getters: {
    getUsers(state) {
      return state.users;
    },
  },
  actions: {
    async fetchUsers() {
      const usersPromise = await fetch("https://gorest.co.in/public/v2/users", {
        headers: new Headers({
          Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`,
        }),
      });
      this.users = await usersPromise.json();
    },
    async addUser(user) {
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
      this.users = [newRow, ...this.users];
    },
    async updateUser(user) {
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
      const newArray = [
        newRow,
        ...this.users.filter((user) => user.id !== newRow.id),
      ];
      this.users = newArray;
    },
  },
});
