<template>
    <div class="flex flex-col space-y-2">
      <label v-if="label" :for="id" class="text-sm font-medium text-gray-700">
        {{ label }}
      </label>
      <textarea
        :id="id"
        v-model="inputValue"
        :placeholder="placeholder"
        :rows="rows"
        :class="[
          'border rounded-lg px-3 py-2 focus:outline-none transition resize-none h-24',
          error ? 'border-red-500' : 'border-gray-300 focus:ring-2 focus:ring-blue-500',
          customClass
        ]"
        @input="updateValue"
         maxlength="256"
      ></textarea>
      <p v-if="error" class="text-red-500 text-xs">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from "vue";
  
  const props = defineProps({
    modelValue: String,
    label: String,
    placeholder: String,
    rows: { type: Number, default: 3 },
    error: String,
    customClass: String,
    id: String
  });
  
  const emit = defineEmits(["update:modelValue"]);
  const inputValue = ref(props.modelValue);
  
  const updateValue = (event) => {
    emit("update:modelValue", event.target.value);
  };
  </script>
  