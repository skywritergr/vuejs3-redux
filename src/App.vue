<template>
  <CreateUser :form-model="this.formModel" @update:form-model="formUpdated" />
  <UserTable :user-data="state.userData" @new:user-details-updated="updateUser" />
</template>

<script>
import CreateUser from './components/CreateUser.vue';
import UserTable from './components/UserTable.vue';

import { mapState, mapActions } from 'redux-vuex';
import { getUsers, addUser } from './store/users/userService';

export default {
  name: 'App',
  components: {
    CreateUser,
    UserTable,
  },
  setup() {
    return {
      formModel: {
        name: "",
        gender: "",
        email: "",
        status: "active",
      },
      state: mapState({
        userData: state => state.users.activeUsers
      }),
      ...mapActions('addUser'),
      ...mapActions({
        getUsers: ({dispatch}) => dispatch(getUsers()),
        addUser: ({dispatch}, user) => dispatch(addUser(user)),
      })
    };
  },
  async mounted() {
    this.getUsers();
  },
  methods: {
    formUpdated() {
      this.addUser(this.formModel)
    },
    updateUser(updatedUser) {
      const newArray = [
        updatedUser,
        ...this.userData.filter(user => user.id !== updatedUser.id)
      ];
      this.userData = newArray;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>