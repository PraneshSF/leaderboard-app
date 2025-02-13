<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "../store/userStore";
import ActionButton from "./ActionButton.vue";
import FormInput from "./FormInput.vue";
import FormTextArea from "./FormTextArea.vue";

const userStore = useUserStore();
const newUser = ref({ name: "", age: "", address: "" });
const errors = ref({ name: "", age: "", address: "" });
const formSubmitted = ref(false); // Track first submission

const validateForm = () => {
  formSubmitted.value = true; // Mark form as submitted

  // Name validation
  if (!newUser.value.name) {
    errors.value.name = "Name is required";
  } else if (newUser.value.name.length > 60) {
    errors.value.name = "Name cannot exceed 60 characters";
  } else if (/^\d+$/.test(newUser.value.name)) {
    errors.value.name = "Name cannot be only numbers";
  } else {
    errors.value.name = "";
  }

  // Age validation
  const age = parseInt(newUser.value.age);
  if (!newUser.value.age) {
    errors.value.age = "Age is required";
  } else if (isNaN(age) || age <= 0) {
    errors.value.age = "Age must be greater than 0";
  }  else if (age > 108) {
    errors.value.age = "Age Can not be greater than 108";
  } else {
    errors.value.age = "";
  }

  // Address validation
  if (!newUser.value.address) {
    errors.value.address = "Address is required";
  } else if (newUser.value.address.length > 256) {
    errors.value.address = "Address cannot exceed 256 characters";
  } else {
    errors.value.address = "";
  }

  return !errors.value.name && !errors.value.age && !errors.value.address;
};

const addUser = () => {
  if (!validateForm()) return; // Stop execution if validation fails

  userStore.addUser({
    id: Date.now(),
    name: newUser.value.name,
    age: parseInt(newUser.value.age),
    address: newUser.value.address,
    points: 0,
  });

  // Reset form and errors
  newUser.value = { name: "", age: "", address: "" };
  errors.value = { name: "", age: "", address: "" };
  formSubmitted.value = false;
  emit('close')

};

// Computed property to enable button **only when all fields are valid**
const isFormValid = computed(() => {
  return (
    newUser.value.name &&
    newUser.value.age &&
    newUser.value.address &&
    !errors.value.name &&
    !errors.value.age &&
    !errors.value.address
  );
});

const handleKeyUp = (event) => {
  if (event.key === "Enter") {
    addUser();
  }
};

const emit = defineEmits(["close"]);
</script>

<template>
  <section class="fixed inset-0 bg-black/50 backdrop-blur bg-opacity-50 flex justify-center items-center px-6">
    <div class="relative flex flex-col bg-white p-6 gap-4 rounded-lg shadow-lg w-full max-w-xl">
      <font-awesome-icon 
        @click="emit('close')" 
        class="absolute top-3 right-3 text-3xl text-red-500 cursor-pointer" 
        :icon="['fas', 'circle-xmark']" 
      />
      <h2 class="text-2xl font-bold"> Add New User</h2>

      <!-- Form Wrapper -->
      <form @submit.prevent="addUser" @keyup.enter="handleKeyUp" class="flex flex-col gap-4">
        <FormInput 
          v-model="newUser.name" 
          label="User Name" 
          placeholder="Enter user name" 
          :error="formSubmitted && errors.name ? errors.name : ''"
          @input="formSubmitted && validateForm()"
          customClass="bg-gray-50"
        />

        <FormInput 
          v-model="newUser.age" 
          label="User Age" 
          type="number"
          placeholder="Enter user age" 
          :error="formSubmitted && errors.age ? errors.age : ''"
          @input="formSubmitted && validateForm()"
          customClass="bg-gray-50"
          :max="108"
        />

        <FormTextArea  
          v-model="newUser.address" 
          label="User Address" 
          placeholder="Enter user address" 
          :rows="5"
          :error="formSubmitted && errors.address ? errors.address : ''"
          @input="formSubmitted && validateForm()"
          customClass="bg-gray-50"
        />

        <!-- Submit Button -->
        <ActionButton 
          type="submit"
          label="Submit" 
          customClass="ml-auto" 
          :disabled="!isFormValid"
        />
      </form>
    </div>
  </section>
</template>
