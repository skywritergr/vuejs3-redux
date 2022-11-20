<template>
  <tr
    scope="row"
    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
    :class="{ 'bg-gray-50': idx / 2 === 0 }"
    @click="onRowClicked"
  >
    <td class="py-2 px-6">{{ user.name }}</td>
    <td class="py-2 px-6">{{ user.email }}</td>
    <td class="py-2 px-6">{{ user.gender }}</td>
  </tr>

  <div v-if="isUpdateFormVisible" class="floating">
    <CreateUser :form-model="this.formModel" @update:form-model="formUpdated" :isUpdate="true" />
  </div>
</template>

<script>
import { toRef, ref } from "vue";
import { mapActions } from 'redux-vuex'
import CreateUser from "./CreateUser.vue";

export default {
  name: "UserTableRow",
  components: {
    CreateUser,
  },
  setup(props) {
    const user  = toRef(props, 'user');
    const isUpdateFormVisible = ref(false);

    return {
      isUpdateFormVisible,
      formModel: {
        name: user.value.name,
        gender: user.value.gender,
        email: user.value.email,
        status: "active",
      },
      ...mapActions('updateUser'),
    };
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
    idx: {
      type: Number,
      required: true,
    },
  },
  methods: {
    onRowClicked() {
      this.isUpdateFormVisible = !this.isUpdateFormVisible;
    },
    formUpdated() {
      this.updateUser(this.formModel);
      this.isUpdateFormVisible = !this.isUpdateFormVisible;
    }
  },
};
</script>

<style scoped>
.floating {
   cursor: pointer;
   display: block;
   float: right;  
   z-index: 3;
   position: absolute;
   right: 30%; 
   top: 25%;
   background-color: white;
    box-shadow: 3px 5px 16px 2px rgba(0,0,0,0.35);
    padding: 15px;
}
</style>