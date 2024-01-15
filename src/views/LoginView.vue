<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label for="email">Email:</label>
      <input type="email" v-model="email" />
      <br />
      <label for="password">Password:</label>
      <input type="password" v-model="password" />
      <br />
      <button type="submit" :disabled="!isFormValid">Login</button>

      <!-- Show error message if any -->
      <div v-if="errorMessage" style="color: red;">
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/authStore';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const password = ref('');
const email = ref('');
const errorMessage = ref('');
const router = useRouter();

const isFormValid = ref(false);

const login = async () => {
  try {
    if (isFormValid.value) {
      await authStore.loginUser({ password: password.value, email: email.value });
      router.push('/');
    }
  } catch (error: any) {
    console.error('Error mani login:', error);
    errorMessage.value = error.message || 'An unknown error occurred';
  }
};

watch([password, email], () => {
  isFormValid.value = password.value.trim() !== '' && email.value.trim() !== '';
});
</script>
