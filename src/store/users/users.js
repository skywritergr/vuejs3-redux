import { defineStore } from "pinia";
import {
  getAddUserPromise,
  getUsersPromise,
  getUpdatedRowPromise,
} from "./userService";

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
      const usersPromise = await getUsersPromise();
      this.users = await usersPromise.json();
    },
    async addUser(user) {
      const updatedRowPromise = await getAddUserPromise(user);
      const newRow = await updatedRowPromise.json();
      this.users = [newRow, ...this.users];
    },
    async updateUser(user) {
      const updatedRowPromise = await getUpdatedRowPromise(user);
      const newRow = await updatedRowPromise.json();
      const newArray = [
        newRow,
        ...this.users.filter((user) => user.id !== newRow.id),
      ];
      this.users = newArray;
    },
  },
});
