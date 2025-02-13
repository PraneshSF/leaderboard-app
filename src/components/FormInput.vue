<template>
    <div class="flex flex-col space-y-2">
      <label v-if="label" :for="id" class="text-sm font-medium text-gray-700">
        {{ label }}
      </label>
      <input
        :id="id"
        :type="type"
        v-model="inputValue"
        @input="updateValue"
        :placeholder="placeholder"
        :class="[
          'border rounded-lg px-3 py-2 focus:outline-none transition',
          error ? 'border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-500',
          customClass
        ]"
        min="0"
        :max="max"
        maxlength="60"
      />
      <p v-if="error" class="text-red-500 text-xs">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from "vue";
  
  const props = defineProps({
    modelValue: String,
    label: String,
    type: { type: String, default: "text" },
    placeholder: String,
    error: String,
    customClass: String,
    id: String,
    max: { type: Number, default: 999 },
  });
  
  const emit = defineEmits(["update:modelValue"]);
  const inputValue = ref(props.modelValue);
  
  const updateValue = (event) => {
    emit("update:modelValue", event.target.value);
  };
  </script>
  