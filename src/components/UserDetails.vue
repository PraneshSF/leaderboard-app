<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps(["user"]);
const emit = defineEmits(["close"]);
</script>

<template>
  <section v-if="user" class="fixed inset-0 bg-black/50 backdrop-blur bg-opacity-50 flex justify-center items-center px-6" @click.self="emit('close')">
    <div class="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-xl">
      <h2 class="text-2xl font-bold capitalize">{{ user.name }}'s Details</h2>
      <p><strong>Age:</strong> {{ user.age }}</p>
      <p><strong>Points:</strong> {{ user.points }}</p>
      <p><strong>Address:</strong> {{ user.address }}</p>

      <font-awesome-icon @click="emit('close')" class="absolute top-3 right-3 text-3xl text-red-500 cursor-pointer" :icon="['fas', 'circle-xmark']" />

    </div>
  </section>
</template>
