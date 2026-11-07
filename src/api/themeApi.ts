import { apiClient } from './client';
import { ThemeColors, ThemeMode } from '../types';

export const themeApi = {
  getTheme: async (_userId?: string): Promise<{ mode: ThemeMode | null; color: ThemeColors | null }> => {
    const res = await apiClient.get<{ mode: ThemeMode | null; color: ThemeColors | null }>('/api/theme');
    return res.data;
  },

  updateTheme: async (
    themeOrUserId: any,
    theme?: { mode: ThemeMode; color: ThemeColors }
  ): Promise<any> => {
    const payload = theme || themeOrUserId;
    const res = await apiClient.put('/api/theme', payload);
    return res.data;
  },
};

