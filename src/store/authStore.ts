import { defineStore } from 'pinia';
import type { User } from '@/types/typeUser';
import { usersApi } from '@/services/api/users-api';

interface UsersState {
  user: User[];
  currentUser: User | null;
  accessToken: string;
  isAuthenticated: boolean;
}

export const useAuthStore = defineStore('user', {
  state: (): UsersState => ({
    user: [],
    currentUser: null,
    accessToken: '',
    isAuthenticated: false,
  }),
  getters: {
    getUsers: (state) => state.user,
    getCurrentUser: (state) => state.currentUser,
    getAccessToken: (state) => state.accessToken,
    getIsAuthenticated: (state) => state.isAuthenticated,
  },
  actions: {
    async logout(): Promise<void> {
      this.$patch((state: UsersState) => {
        state.currentUser = null;
        state.accessToken = '';
        state.isAuthenticated = false;
      });

      // Clear values from local storage
      localStorage.clear();
    },

    setUsers(user: User[]): void {
      this.$patch((state) => {
        state.user = user;
      });
    },

    setCurrentUser(user: User): void {
      this.$patch((state) => {
        state.currentUser = user;
      });
    },

    setAccessToken(accessToken: string): void {
      this.$patch((state) => {
        state.accessToken = accessToken;
        state.isAuthenticated = true;
      });
    },

    setUser({ id, user }: { id: number; user: User }): void {
      const index = this.user.findIndex((u) => u.id === id);
      if (index !== -1) {
        this.$patch((state) => {
          state.user[index] = user;
          if (state.currentUser?.id === id) {
            state.currentUser = { ...state.currentUser, ...user };
          }
        });
      }
    },

    removeUser(id: number): void {
      const user = this.user.find((u) => u.id === id);
      if (user) {
        this.$patch((state) => {
          state.user.splice(state.user.indexOf(user), 1);
          if (state.currentUser?.id === id) {
            state.currentUser = null;
          }
        });
      }
    },

    async loginUser({ email, password }: { email: string; password: string }): Promise<void> {
      try {
        const res = await usersApi.login(email, password);
        console.log(res, 'Response received');

        if (res && res.code === 200) {
          const { user, token } = res.data;

          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('accessToken', token);

          this.$patch((state) => {
            console.log(state,'va;ieiieieiei')
            state.currentUser = user;
            state.accessToken = token;
            state.isAuthenticated = true;
          });
        } else {
          console.error('Login failed:', res || 'Unknown error');
          throw res;
        }
      } catch (error) {
        console.error('Error during login:', error);
        throw error;
      }
    },
  },
});
