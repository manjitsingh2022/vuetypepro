import type { ApiResponse, User } from '@/types/typeUser';
import { create, read, update, del, makeRequest } from './index';

export const usersApi = {
  read: async (params: any): Promise<User[]> => {
    return read("/users/list/", { params });
  },

  create: async (user: any, { config = {} } = {}): Promise<User> => {
    return create("/users/", user, config);
  },

  update: async (id: number, user: any, config?: any): Promise<User> => {
    return update(`/users/${id}`, user, config, true);
  },

  delete: async (id: number, config?: any): Promise<void> => {
    return del(`/users/${id}`, config);
  },

  login: async (email: string, password: string): Promise<any> => {
    try {
      const res = await create("/users/login/", { email, password }, {});
        return res;
    } catch (error:any) {
      console.error('Error during login:', error);
      console.error('Error dfdfdfdfdf login:', error);
      throw new Error(error || 'Login failed');
    }
  },
  

  uploadFile: async (file: File, config?: any): Promise<any> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      // Adjust the endpoint as needed
      const res: ApiResponse = await makeRequest('POST', '/api/upload', formData, config);
      // Handle the response accordingly
      return res;
    } catch (error) {
      console.error('Error during file upload:', error);
      throw error;
    }
  },
};

export default usersApi;
