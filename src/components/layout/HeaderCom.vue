<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/store/authStore';

const route = useRouter();
const authStore = useAuthStore();

const logout = async () => {
  await authStore.logout();
  route.push('/login');
};
</script>

<template>
  <header class="bg-gray-500 text-white p- flex items-center justify-between">
    <!-- Corrected image path -->
    <img alt="Vue logo" class="mr-4" src="@/assets/logo.svg" width="120" height="120" />

    <nav class="flex">
      <RouterLink to="/" class="px-4 border-l border-none border-gray-300">Home</RouterLink>
      <RouterLink to="/about" class="px-4 border-l border-none border-gray-300">About</RouterLink>
      <RouterLink to="/contact" class="px-4 border-l border-none border-gray-300">Contact</RouterLink>
      <button v-if="authStore.isAuthenticated" @click="logout" class="px-4 border-l border-solid border-gray-300">Logout</button>
    </nav>
  </header>
</template>

<style scoped>
/* Add your custom styling here, if needed */
/* Example: */
header {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
nav {
  display: flex;
  align-items: center;
}
button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}
</style>
