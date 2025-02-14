import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, beforeEach } from "vitest";
import { useUserStore } from "./userStore";

describe("User Store", () => {
  let userStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    userStore = useUserStore();
  });

  it("adds a new user", () => {
    const newUser = { id: 6, name: "Sophia", age: 19, points: 10, address: "789 St" };
    userStore.addUser(newUser);

    expect(userStore.users).toContainEqual(newUser);
  });

  it("deletes a user", () => {
    userStore.deleteUser(1);
    expect(userStore.users.some((user) => user.id === 1)).toBe(false);
  });

  it("updates user points", () => {
    const userId = 2;
    const initialPoints = userStore.users.find((user) => user.id === userId)?.points || 0;

    userStore.updatePoints(userId, 5);
    expect(userStore.users.find((user) => user.id === userId)?.points).toBe(initialPoints + 5);
  });

  it("sets user points directly", () => {
    const userId = 3;
    userStore.setPoints(userId, 50);
    expect(userStore.users.find((user) => user.id === userId)?.points).toBe(50);
  });

  it("sorts users by points descending by default", () => {
    userStore.sortUsers();
    expect(userStore.users[0].points).toBeGreaterThanOrEqual(userStore.users[1].points);
  });

  it("filters users by search query", () => {
    userStore.setSearchQuery("Emma");
    expect(userStore.filteredUsers.length).toBe(1);
    expect(userStore.filteredUsers[0].name).toBe("Emma");
  });
});
