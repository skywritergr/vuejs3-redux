<template>
    <div class="grid place-items-center">
        <table class="table-auto">
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400"
          >
            <th class="py-3 px-6">Name</th>
            <th class="py-3 px-6">Email</th>
            <th class="py-3 px-6">Gender</th>
          </thead>
          <tbody>
            <UserTableRow v-for="(user, idx) in userData" :key="user.id" :user="user" :idx="idx" />
          </tbody>
        </table>
    </div>
</template>

<script>
import UserTableRow from './UserTableRow.vue';

export default {
  name: "UserTable",
  emits: ['new:userDetailsUpdated'],
  components: {
    UserTableRow,
  },
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
};
</script>
