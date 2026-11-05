import axios from 'axios';
import { URL } from '../utils/constants';
import { getUserToken, removeUserToken } from '../utils/userAuth';

// Ensure base URL points to the backend origin (e.g. http://localhost:5000)
const baseOrigin = URL.replace(/\/api\/?$/i, '').replace(/\/+$/, '');

export const apiClient = axios.create({
  baseURL: baseOrigin,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getUserToken();
  if (token) {
    // Only send the token in the Authorization header as requested
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear expired or invalid token from storage
      removeUserToken();
    }
    return Promise.reject(error);
  }
);

