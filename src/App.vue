<template>
  <CreateUser :form-model="this.formModel" @update:form-model="formUpdated" />
  <UserTable :user-data="userData" @new:user-details-updated="updateUser" />
</template>

<script>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import CreateUser from './components/CreateUser.vue'
import UserTable from './components/UserTable.vue';
import { useUserStore } from './store/users/users';


export default {
  name: 'App',
  components: {
    CreateUser,
    UserTable,
  },
  setup() {
    const userJson = ref([]);
    const store = useUserStore();
    userJson.value = store.getUsers;

    return {
      formModel: {
        name: "",
        gender: "",
        email: "",
        status: "active",
      },
      userData: computed(() => store.getUsers),
      store,
    };
  },
  mounted() {
    this.store.fetchUsers();
  },
  methods: {
    async formUpdated() {
      this.store.addUser(this.formModel);
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