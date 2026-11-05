import { apiClient } from './client';
import { User } from '../types';

export const authApi = {
  login: async (credentials: { email: string; password?: string }): Promise<{ user: User; token: string }> => {
    const res = await apiClient.post<{ user: User; token: string }>('/api/auth/login', credentials);
    return res.data;
  },

  getCurrentUser: async (_token?: string): Promise<User> => {
    const res = await apiClient.get<User>('/api/auth/me');
    return res.data;
  },

  getAllUsers: async (): Promise<User[]> => {
    const res = await apiClient.get<User[]>('/api/auth/users');
    return res.data || [];
  },
};

