import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    users: [
        { "id": 1, "name": "Emma", "age": 18, "points": 25, "address": "123 St" },
        { "id": 2, "name": "Noah", "age": 17, "points": 18, "address": "456 St" },
        { "id": 3, "name": "James", "age": 18, "points": 17, "address": "252 St" },
        { "id": 4, "name": "William", "age": 17, "points": 6, "address": "767 St" },
        { "id": 5, "name": "Olivia", "age": 17, "points": 3, "address": "536 St" }
      ],
    searchQuery: "",
    sortBy: "points",
    sortOrder: "desc",
  }),
  actions: {
    async fetchUsers() {
      try {
        const response = await axios.get("http://localhost:3000/users");
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    updatePoints(userId, change) {
      const user = this.users.find((u) => u.id === userId);
      if (user) {
        user.points += change;
        this.sortUsers();
      }
    },
    setPoints(userId, change) {
        const user = this.users.find((u) => u.id === userId);
        if (user) {
          user.points = change;
          this.sortUsers();
        }
      },
    addUser(newUser) {
      this.users.push(newUser);
      this.sortUsers();
    },
    deleteUser(userId) {
      this.users = this.users.filter((user) => user.id !== userId);
    },
    setSearchQuery(query) {
      this.searchQuery = query.toLowerCase();
    },
    setSort(field) {
      if (this.sortBy === field) {
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      } else {
        this.sortBy = field;
        this.sortOrder = "asc";
      }
      this.sortUsers();
    },
    sortUsers() {
      this.users.sort((a, b) => {
        let result = 0;
        if (this.sortBy === "name") {
          result = a.name.localeCompare(b.name);
        } else {
          result = a.points - b.points;
        }
        return this.sortOrder === "asc" ? result : -result;
      });
    },
  },
  getters: {
    filteredUsers: (state) => {
      return state.users.filter((user) =>
        user.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  },
});
