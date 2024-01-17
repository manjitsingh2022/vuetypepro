<template>
    <div class="flex items-center justify-center h-screen bg-gray-100">
      <div class="text-center">
        <h1 class="text-6xl font-extrabold text-red-600">404</h1>
        <p class="mt-4 text-xl text-gray-800">Page Not Found</p>
        <div class="mt-8">
          <router-link :to="{ name: 'home' }">Go to Home</router-link>
          <button @click="goBack" class="ml-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
            Go Back
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { getCurrentInstance } from 'vue';
  export default {
    name: 'NotFound', 
    setup() {
      const instance = getCurrentInstance();
      console.log(instance,'instance')
      if (!instance) {
        throw new Error('getCurrentInstance returned null');
      }
      const goBack = () => {
        if (instance.proxy && instance.proxy.$router) {
          instance.proxy.$router.go(-1);
        }
      };
      return {
        goBack,
      };
    },
  };
  </script>
  
  
  
  <style scoped>
  </style>
  