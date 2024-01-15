import './assets/main.css'
import App from './App.vue'
import router from './router'
import { createApp } from 'vue';
import { setupPinia,  } from './stores';
import { useAuthStore } from './stores/authStore';

const app = createApp(App);
app.use(router);
setupPinia(app);
const storedUser = localStorage.getItem('user');

if (storedUser) {
  const user = JSON.parse(storedUser);
  console.log( user,'localuser')
  useAuthStore().users = user;
  useAuthStore().isAuthenticated = true;
}
app.mount('#app');
