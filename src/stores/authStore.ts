import { defineStore } from 'pinia';
import type { User } from '@/types/typeUser';
import { usersApi } from '@/services/api/users-api';
interface UsersState {
  users: User[];
  currentUser: User | null;
  accessToken: string;
  isAuthenticated: boolean; 

}

export const useAuthStore = defineStore('users', {
  state: (): UsersState => ({
    users: [],
    currentUser: null,
    accessToken: '',
    isAuthenticated: false,
  }),
  getters: {
    getUsers: (state) => state.users,
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

    setUsers(users: User[]): void {
      this.users = users;
    },
    setCurrentUser(user: User): void {
      this.currentUser = user;
    },
    setAccessToken(accessToken: string): void {
      this.accessToken = accessToken;
      this.isAuthenticated = true; 
    },
    setUser({ id, user }: { id: number; user: User }): void {
      const index = this.users.findIndex((u) => u.id === id);
      if (index !== -1) {
        this.$patch((state) => {
          state.users[index] = user;
          if (state.currentUser?.id === id) {
            state.currentUser = { ...state.currentUser, ...user };
          }
        });
      }
    },
    removeUser(id: number): void {
      const user = this.users.find((u) => u.id === id);
      if (user) {
        this.$patch((state) => {
          state.users.splice(state.users.indexOf(user), 1);
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
          const user = res.data.user;
          const accessToken = res.data.token;
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('accessToken', accessToken);
    
          console.log('Login successful');
          this.$patch((state) => {
            state.currentUser = user; // Update with correct property
            state.accessToken = accessToken; // Update with correct property
          });
        } else {
          console.error('Login failed:', res || 'Unknown error');
          throw  res;
        }
      } catch (error) {
        console.error('Error during login:', error);
        throw error;
      }
    }
    
    
    
    // async registerUser({
    //   email,
    //   password,
    //   ...other
    // }: {
    //   email: string;
    //   password: string;
    //   [key: string]: any;
    // }): Promise<void> {
    //   try {
    //     const res = await usersApi.register(email, password, { ...other });
    //     this.$patch((state) => {
    //       state.currentUser = res.user;
    //       state.accessToken = res.accessToken;
    //     });
    //   } catch (error) {
    //     console.error('Registration failed:', (error as Error).message);
    //     throw error;
    //   }
    // },

    // Implement other actions as needed

  },
});
