<template>
  <h2 class="text-2xl my-6">
    {{ isUpdate ? "Update the user information" : "Create a new user" }}
  </h2>
  <form @submit.prevent="submit" class="create-user-form">
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <div>
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Name:</label
        >
        <input
          type="text"
          name="name"
          v-model="formObjectModel.name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label
          for="gender"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Gender:</label
        >
        <input
          type="text"
          name="gender"
          v-model="formObjectModel.gender"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div>
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Email:</label
        >
        <input
          type="email"
          name="email"
          v-model="formObjectModel.email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
    </div>
    <div>
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        {{ isUpdate ? "Update user" : "Create user" }}
      </button>
    </div>
  </form>
  <UserTable />
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "CreateUser",
  emits: ["update:formModel"],
  props: {
    formModel: {
      type: Object,
      default: () => ({}),
    },
    isUpdate: {
      type: Boolean,
      default: false,
    },
    submitAction: {
      type: String,
      default: 'update:formModel'
    }
  },
  setup(props) {
    const formObjectModel = computed({
      get: () => props.formModel,
    });

    return {
      formObjectModel,
    };
  },
  methods: {
    async submit() {
      this.$emit("update:formModel", this.formObjectModel);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.create-user-form {
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    margin-bottom: 10px;

    label {
      width: 70px;
      margin-right: 8px;
      float: left;
    }
  }
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
