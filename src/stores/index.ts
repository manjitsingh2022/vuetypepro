import { createPinia } from 'pinia';
import type { App } from 'vue'; 
import { useAuthStore } from './authStore';

const pinia = createPinia();

export const setupPinia = (app: App) => {
  app.use(pinia);
};

export { useAuthStore };
