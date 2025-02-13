<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  title: { type: String, default: "Confirm Action" },
  message: { type: String, required: true },
  confirmLabel: { type: String, default: "Confirm" },
  cancelLabel: { type: String, default: "Cancel" },
  show: { type: Boolean, required: true }, // Controls visibility
});

const emit = defineEmits(["confirm", "cancel", "update:show"]);
</script>

<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm px-6"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 v-if="title" class="text-xl font-semibold mb-2">{{ title }}</h2>
        <p v-if="message" class="text-gray-700 mb-4" v-html="message"></p>

        <div class="flex justify-end gap-4">
          <button
            @click="emit('update:show', false); emit('cancel')"
            class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            {{ cancelLabel }}
          </button>
          <button
            @click="emit('update:show', false); emit('confirm')"
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            {{ confirmLabel }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>