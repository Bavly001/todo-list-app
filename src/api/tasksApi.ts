import { apiClient } from './client';
import { Task } from '../types';

export interface TaskQueryParams {
  view?: 'today' | 'upcoming' | 'inbox' | 'all';
  date?: string;
  projectId?: string;
  search?: string;
}

export interface TaskCountsResponse {
  today: number;
  upcoming: number;
  inbox: number;
  projects: Record<string, number>;
}

export const tasksApi = {
  getTasks: async (paramsOrUserId?: TaskQueryParams | string): Promise<Task[]> => {
    const config =
      typeof paramsOrUserId === 'object' && paramsOrUserId !== null
        ? { params: paramsOrUserId }
        : {};

    const res = await apiClient.get<Task[]>('/api/tasks', config);
    const data = res.data;
    if (!data || !Array.isArray(data)) return [];
    return data.sort((a, b) => {
      if (!a?.date) return 1;
      if (!b?.date) return -1;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  },

  getTaskCounts: async (date?: string): Promise<TaskCountsResponse> => {
    const res = await apiClient.get<TaskCountsResponse>('/api/tasks/counts', {
      params: date ? { date } : undefined,
    });
    return res.data || { today: 0, upcoming: 0, inbox: 0, projects: {} };
  },

  getTaskById: async (id: string): Promise<Task> => {
    const res = await apiClient.get<Task>(`/api/tasks/${id}`);
    return res.data;
  },

  createTask: async (task: Partial<Task>): Promise<Task> => {
    const res = await apiClient.post<Task>('/api/tasks', task);
    return res.data;
  },

  updateTask: async (id: string, task: Partial<Task>): Promise<Task> => {
    const res = await apiClient.patch<Task>(`/api/tasks/${id}`, task);
    return res.data;
  },

  deleteTask: async (id: string): Promise<{ message: string; id: string }> => {
    const res = await apiClient.delete<{ message: string; id: string }>(`/api/tasks/${id}`);
    return res.data;
  },

  updateTasks: async (tasksOrUserId: any, tasks?: Task[]): Promise<any> => {
    const payload = Array.isArray(tasksOrUserId) ? tasksOrUserId : (tasks || []);
    const res = await apiClient.put('/api/tasks', payload);
    return res.data;
  },
};

