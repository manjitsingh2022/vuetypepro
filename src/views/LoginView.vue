<script lang="ts" >
import { useAuthStore } from '@/store/authStore';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name:'LoginView',
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const password = ref('');
    const email = ref('');
    const errorMessage = ref('');
    const isFormValid = ref(false);

    const login = async () => {
      try {
        if (isFormValid.value) {
          await authStore.loginUser({ password: password.value, email: email.value });
          router.push('/');
        }
      } catch (error:any) {
        console.error('Error during login:', error);
        errorMessage.value = error.message || 'An unknown error occurred';
      }
    };

    watch([password, email], () => {
      isFormValid.value = password.value.trim() !== '' && email.value.trim() !== '';
    });

    return {
      password,
      email,
      errorMessage,
      isFormValid,
      login,
    };

  },
  
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 ">
    <div class="max-w-md w-full ">
      <h2 class="text-3xl font-extrabold text-white text-center mb-6">Login</h2>
      <form @submit.prevent="login" class="space-y-4 ">
        <div class="mb-4">
          <label for="email" class="text-white">Email:</label>
          <input v-model="email" type="email" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div class="mb-4">
          <label for="password" class="text-white">Password:</label>
          <input v-model="password" type="password" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div v-if="errorMessage" class="text-red-500 text-sm text-center">
          {{ errorMessage }}
        </div>
        <button :disabled="!isFormValid" type="submit" class="w-full bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-green-600">Login</button>
      </form>
    </div>
  </div>
</template>

