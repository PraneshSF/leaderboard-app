<template>
    <button :class="['px-4 py-2 rounded-lg flex items-center gap-2 min-w-fit disabled:pointer-events-none disabled:!bg-[#A9A9A9]', customClass]" :disabled="disable">
      <font-awesome-icon v-if="icon" :icon="['fas', icon]" />
      <span>{{ label }}</span>
    </button>
  </template>
  
  <script setup>
  defineProps({
    label: { type: String, required: true },
    icon: { type: String, default: "" },
    customClass: { type: String, default: "" },
    disable: {type: Boolean, default: false}
  });
  </script>
  
  <style scoped>
  button {
    background-color: #00BFFF;
    color: white;
    border: none;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  button:hover {
    background-color: #1E90FF;
  }
  </style>
  