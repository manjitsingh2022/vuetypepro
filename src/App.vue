<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderCom from './components/layout/HeaderCom.vue';
import FooterCom from './components/layout/FooterCom.vue';
import { useAuthStore } from './store/authStore';
console.log(useAuthStore().accessToken,'valiieee')
const authStore = useAuthStore();
console.log(authStore,'vlldkslsdlsd')
</script>

<template>
  <div >
    <HeaderCom v-if="authStore.isAuthenticated" />
    <RouterView />
    <FooterCom v-if="authStore.isAuthenticated" />
  </div>
</template>

<style scoped>

.temp{
      padding: 0 7rem;
}
main {
  padding: 2rem;

}
</style>
