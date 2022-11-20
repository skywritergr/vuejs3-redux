<template>
  <CreateUser :form-model="this.formModel" @update:form-model="formUpdated" />
  <UserTable :user-data="userData" @new:user-details-updated="updateUser" />
</template>

<script>
import { ref } from 'vue';
import CreateUser from './components/CreateUser.vue'
import UserTable from './components/UserTable.vue';


export default {
  name: 'App',
  components: {
    CreateUser,
    UserTable,
  },
  setup() {
    const userJson = ref([]);
    const loadUserJson = async () => {
      const users = await fetch("https://gorest.co.in/public/v2/users", {
        headers: new Headers({
          Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`
        })
      });
      userJson.value = await users.json();
    };

    return {
      formModel: {
        name: "",
        gender: "",
        email: "",
        status: "active",
      },
      userData: userJson,
      loadUserJson,
    };
  },
  mounted() {
    this.loadUserJson();
  },
  methods: {
    async formUpdated() {
      const updatedRowPromise = await fetch('https://gorest.co.in/public/v2/users', {
        method: 'POST',
        body: JSON.stringify(this.formModel),
        headers: new Headers({
          Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`,
          Accept: "application/json",
          "Content-Type":"application/json"
        })
      });
      const newRow = await updatedRowPromise.json();
      this.userData = [
        newRow,
        ...this.userData,
      ]
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