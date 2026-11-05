import { apiClient } from './client';
import { CompletedTask } from '../types';

export const completedTasksApi = {
  getCompletedTasks: async (_userId?: string): Promise<CompletedTask[]> => {
    const res = await apiClient.get<CompletedTask[]>('/api/completed-tasks');
    const data = res.data;
    if (!data || !Array.isArray(data)) return [];
    return data;
  },

  createCompletedTask: async (task: Partial<CompletedTask>): Promise<CompletedTask> => {
    const res = await apiClient.post<CompletedTask>('/api/completed-tasks', task);
    return res.data;
  },

  deleteCompletedTask: async (id: string): Promise<any> => {
    const res = await apiClient.delete(`/api/completed-tasks/${id}`);
    return res.data;
  },

  updateCompletedTasks: async (tasksOrUserId?: any, tasks?: CompletedTask[]): Promise<any> => {
    const payload = Array.isArray(tasksOrUserId) ? tasksOrUserId : (tasks || []);
    const res = await apiClient.put('/api/completed-tasks', payload);
    return res.data;
  },
};

