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
  if (!response) {
    console.log(response,'responseresponseresponseresponseresponse')
    throw new Error('Invalid response. Please try again.');
  }

  const { data } = response;
  console.log(response, 'klsklsdklkldsdslklsk');

  if (response.status >= 200 && response.status < 300) {
    console.log('Response Data:', data);
    return data;
  } else {
    console.error('Error Response:', response);
    if (data && (data.message || data.detail)) {
      throw new Error(data.message || data.detail);
    }  else if (response instanceof AxiosError && response.code === 'ERR_NETWORK') {
      throw new Error(response.message || 'Network error occurred. Please check your internet connection.' );
    }else {
      throw new Error(response.statusText);
    }
  }
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
