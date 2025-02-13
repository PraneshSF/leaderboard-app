<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../store/userStore";

const userStore = useUserStore();
</script>
<template>
  <div class="relative flex items-center border rounded-lg px-3 w-full bg-white">
    <font-awesome-icon class="" :icon="['fas', 'magnifying-glass']" />
  <input
      type="text"
      v-model="userStore.searchQuery"
      placeholder="Search users..."
      class="border-0 p-2 w-full"
    />
    <font-awesome-icon v-show="userStore.searchQuery" @click="userStore.searchQuery = ''" :icon="['fas', 'xmark']" class=" cursor-pointer" />
  </div>
</template>

<style scoped>


</style>
