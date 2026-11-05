import { apiClient } from './client';
import { Project } from '../types';

export const projectsApi = {
  getProjects: async (_userId?: string): Promise<Project[]> => {
    const res = await apiClient.get<Project[]>('/api/projects');
    const data = res.data;
    if (!data || !Array.isArray(data)) return [];
    return data;
  },

  createProject: async (project: { projectId?: string; projectTitle: string }): Promise<Project> => {
    const res = await apiClient.post<Project>('/api/projects', project);
    return res.data;
  },

  deleteProject: async (id: string): Promise<any> => {
    const res = await apiClient.delete(`/api/projects/${id}`);
    return res.data;
  },

  updateProjects: async (projectsOrUserId?: any, projects?: Project[]): Promise<any> => {
    const payload = Array.isArray(projectsOrUserId) ? projectsOrUserId : (projects || []);
    const res = await apiClient.put('/api/projects', payload);
    return res.data;
  },
};

