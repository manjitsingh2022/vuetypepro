<script setup lang="ts">
import { RouterLink, RouterView ,useRouter} from 'vue-router';
import { useAuthStore } from '@/stores';
const route = useRouter()
const authStore = useAuthStore();
console.log(authStore,'authstore')
const logout = () => {
  authStore.logout();
  route.push('/login')
};

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="120" height="120" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
        <button v-if="authStore.isAuthenticated" @click="logout">Logout</button>
      </nav>
    </div>
  </header>
  
    <RouterView />

  <footer>
    &copy; 2024 Your Website
  </footer>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

main {
  padding: 2rem;
}

.logo {
  display: block;
  padding-right: 5rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  display: flex;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 1rem 0 0;
  }

  header .wrapper {
    min-height: 3.25rem;
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
