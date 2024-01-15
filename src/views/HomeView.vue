<script setup lang="ts">
// import UserList from '@/components/UserList.vue';
import TheWelcome from '../components/TheWelcome.vue'
import { useAuthStore } from '@/store/authStore';

const authStore = useAuthStore();

</script>

<template>
  <main>
    <div class="contanier">
      <div>
        <h2>Home</h2>
        <p v-if="authStore.isAuthenticated">
          Welcome, {{ authStore.user ? authStore.user.username : '' }}!
        </p>
      </div>
      <TheWelcome />
      <!-- <UserList /> -->




     

    </div>

  </main>
</template>

<style>
@media (min-width: 1024px) {
  .contanier {
    min-height: 100vh;
    /* align-items: center; */
  }
}
</style>