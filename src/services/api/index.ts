import axios, { AxiosError } from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

import { useAuthStore } from '@/store/authStore';

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export function config(): AxiosRequestConfig {
  return {
    headers: {
      authorization: `Token ${useAuthStore().accessToken}`,
    },

  };
}



function handleResponse(response: AxiosResponse): any {
  return new Promise((resolve, reject) => {
    if (!response) {
      console.error('Invalid response. Please try again.');
      reject(new Error('Invalid response. Please try again.'));
      return;
    }

    const { data, status, statusText } = response;

    if (status >= 200 && status < 300) {
      console.log('Response Data:', data);
      console.log(resolve,'resolve')

      resolve(data);
    } else {
      console.error('Error Response:', response);
      console.log(reject,'reject')

      if (data && (data.message || data.detail || data.error)) {
        reject(new Error(data.message || data.detail || data.error));
      } else if (response instanceof AxiosError && response.code === 'ERR_NETWORK') {
        reject(new Error(response.message || 'Network error occurred. Please check your internet connection.'));
      } else {
        reject(new Error(statusText));
      }
    }
  });
}



export async function create(path: string, data: any, config: AxiosRequestConfig): Promise<any> {
  console.log('Request:', path, data, config);
  try {
    const response = await client.post(path, data, config);
    return handleResponse(response);
  } catch (error:any) {
    handleResponse(error);
  }
}



export async function read(path: string, config: AxiosRequestConfig): Promise<any> {
  console.log('Request:', path, config);

  try {
    const response = await client.get(path, config).then(handleResponse);
    console.log(response, 'readindexapi');
    return response;
  } catch (error:any) {
    handleResponse(error.response); 
  }
}

export async function update(path: string, data: any, config: AxiosRequestConfig, partial = false): Promise<any> {
  console.log('Request:', path, data, config);

  try {
    const response = !partial ? await client.put(path, data, config) : await client.patch(path, data, config);
    return handleResponse(response);
  } catch (error:any) {
    handleResponse(error.response); // Catch error response
  }
}

export async function del(path: string, config: AxiosRequestConfig): Promise<any> {
  console.log('Request:', path, config);

  try {
    const response = await client.delete(path, config);
    return handleResponse(response);
  } catch (error:any) {
    handleResponse(error.response); // Catch error response
  }
}

export async function makeRequest(
  method: string,
  path: string,
  data: any,
  config: AxiosRequestConfig
): Promise<any> {
  console.log('Request:', method, path, data, config);

  try {
    // Check if data contains a File or Blob
    if (data instanceof File || (data instanceof Blob && data.type)) {
      // Handle file upload
      const formData = new FormData();
      formData.append('file', data);
      const response = await client.post(path, formData, config);
      console.log('Response:', response.data);
      return handleResponse(response);
    } else {
      // Handle regular data
      const response = await client.request({
        method,
        url: path,
        data,
        ...config,
      });
      console.log('Response:', response.data);
      return handleResponse(response);
    }
  } catch (error:any) {
    handleResponse(error.response); // Catch error response
  }
}
