<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../store/userStore";
import SearchInput from "@/components/SearchInput.vue";
import ActionButton from "@/components/ActionButton.vue";
import AddUser from "@/components/AddUser.vue";
import UserDetails from "@/components/UserDetails.vue";
import ConfirmBox from '@/components/ConfirmBox.vue';

const userStore = useUserStore();
const selectedUser = ref(null);
const showAddUser = ref(false);
const showViewUser = ref(false);
const showConfirm = ref(false);

onMounted(() => {
  userStore.fetchUsers();
});

const showUserDetails = (user) => {
  showViewUser.value = true;
  selectedUser.value = user;
};

const sepeleteConfirmation = (user) => {
  selectedUser.value = user;
  showConfirm.value = true;
};
</script>

<template>
  <section class="p-6 mx-auto flex flex-col gap-8 w-full max-w-3xl">
    <h1 class="text-3xl font-bold text-center flex items-center justify-center">
      <span class="hidden sm:block" aria-hidden="true">🏆</span> Leaderboard
    </h1>

    <div class="flex items-center gap-4 w-full">
      <SearchInput />
      <ActionButton
        label="Add User"
        icon="fa-circle-plus"
        @click="showAddUser = true"
      />
    </div>

    <!-- Table -->
    <section class="w-full rounded-xl overflow-hidden bg-white text-center">
      <div class="bg-[#A9A9A9] grid grid-cols-3 sm:grid-cols-4 font-bold">
        <p
          @click="userStore.setSort('name')"
          class="cursor-pointer p-2 pl-4 hover:text-[#1E90FF] text-left max-w-24 sm:max-w-sm sm:col-span-2"
        >
          Name
          <font-awesome-icon
            :class="{ 'text-white': userStore.sortBy === 'name' }"
            :icon="[
              'fas',
              userStore.sortOrder === 'asc' ? 'arrow-down-a-z' : 'arrow-up-z-a',
            ]"
          />
        </p>
        <p
          @click="userStore.setSort('points')"
          class="cursor-pointer p-2 hover:text-[#1E90FF]"
        >
          Points
          <font-awesome-icon
            :class="{ 'text-white': userStore.sortBy === 'points' }"
            :icon="[
              'fas',
              userStore.sortOrder === 'asc' ? 'arrow-up-1-9' : 'arrow-down-9-1',
            ]"
          />
        </p>
        <p class="p-2">Actions</p>
      </div>
      <div
        class="custom-scrollbar overflow-y-auto"
        style="max-height: calc(100vh - 286px)"
      >
        <div
          v-for="user in userStore.filteredUsers"
          :key="user.id"
          class="grid grid-cols-3 sm:grid-cols-4 border-t border-[#A9A9A9] group hover:bg-[#00BFFF]/10 transition-all duration-1000"
        >
          <p
            @click="showUserDetails(user)"
            class="cursor-pointer p-2 pl-4 text-left max-w-24 sm:max-w-sm truncate hover:text-[#00BFFF] sm:col-span-2 capitalize"
          >
            {{ user.name }}
          </p>
          <div class="flex items-center justify-center gap-2 p-2">
            <font-awesome-icon
              @click="userStore.updatePoints(user.id, 1)"
              class="text-[#00BFFF] hover:text-[#1E90FF] cursor-pointer text-xl"
              :icon="['fas', 'circle-plus']"
            />
            <input
              type="number"
              min="0"
              v-model="user.points"
              placeholder="-"
              @change="userStore.setPoints(user.id, user.points)"
              class="border-0 focus-within:bg-[#00BFFF]/30 w-10 sm:w-12 max-w-32 text-center hide-arrows rounded-lg"
            />
            <font-awesome-icon
              @click="userStore.updatePoints(user.id, -1)"
              :icon="['fas', 'circle-minus']"
              class="text-[#00BFFF] hover:text-[#1E90FF] cursor-pointer text-xl"
              :class="{ ' pointer-events-none text-[#A9A9A9]': !user.points }"
            />
          </div>
          <p class="flex items-center justify-center gap-4 p-2 text-sm">
            <button
              @click="showUserDetails(user)"
              class="p-1 px-2 border !border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF]/30"
            >
              <font-awesome-icon :icon="['fas', 'eye']" />
            </button>
            <button
              @click="sepeleteConfirmation(user)"
              class="p-1 px-2 border !border-red-500 text-red-500 hover:bg-red-500/30"
            >
              <font-awesome-icon :icon="['fas', 'trash']" />
            </button>
          </p>
        </div>
        <div
          v-if="!userStore.filteredUsers?.length"
          class="w-full text-center p-2 text-lg"
        >
          No Data to Show
        </div>
      </div>
    </section>

    <!-- Add User Form -->
    <AddUser v-if="showAddUser" @close="showAddUser = false" />

    <!-- User Details Modal -->
    <UserDetails
      v-if="selectedUser && showViewUser"
      :user="selectedUser"
      @close="showViewUser = false"
    />

    <ConfirmBox
      v-if="selectedUser"
      v-model:show="showConfirm"
      title="Delete User?"
      :message="`Are you sure you want to delete <b> ${selectedUser?.name}'s</b> Data? this action cannot be undone.`"
      confirmLabel="Yes, Delete"
      cancelLabel="Cancel"
      @confirm="userStore.deleteUser(selectedUser?.id)"
    />
  </section>
</template>

<style>
.hide-arrows::-webkit-outer-spin-button,
.hide-arrows::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.hide-arrows {
  -moz-appearance: textfield;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #1e90ff;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #1e90ff;
}

/* Firefox scrollbar */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #1e90ff #00bfff10;
}
</style>
