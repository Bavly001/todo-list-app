import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tasksApi, projectsApi, completedTasksApi, authApi, themeApi, feedbackApi } from '../api';
import { getUserToken } from '../utils/userAuth';
import { Task, Project, CompletedTask, ThemeMode, ThemeColors } from '../types';
import { TaskQueryParams } from '../api/tasksApi';

// Query Keys
export const QUERY_KEYS = {
  tasks: (token: string | null) => ['tasks', token] as const,
  viewTasks: (view: string, token: string | null, extra?: any) => ['tasks', view, token, extra] as const,
  taskDetails: (taskId: string | null, token: string | null) => ['task', taskId, token] as const,
  taskCounts: (date: string | undefined, token: string | null) => ['task-counts', date, token] as const,
  projects: (token: string | null) => ['projects', token] as const,
  completedTasks: (token: string | null) => ['completedTasks', token] as const,
  theme: (token: string | null) => ['theme', token] as const,
  currentUser: (token: string | null) => ['user', token] as const,
};

// ==========================================
// TASKS HOOKS
// ==========================================

/**
 * Fetch tasks scoped strictly to the current active view or project.
 */
export const useViewTasks = (
  view: 'today' | 'upcoming' | 'inbox' | 'all' | 'project',
  options?: { date?: string; projectId?: string; search?: string }
) => {
  const token = getUserToken();
  const queryParams: TaskQueryParams = {
    view: view === 'project' ? undefined : view,
    date: options?.date,
    projectId: options?.projectId,
    search: options?.search,
  };

  return useQuery({
    queryKey: QUERY_KEYS.viewTasks(view, token, options),
    queryFn: () => tasksApi.getTasks(queryParams),
    enabled: Boolean(token),
    staleTime: 1000 * 30, // 30 seconds
  });
};

/**
 * Fetch lightweight drawer badge counters.
 */
export const useTaskCounts = (date?: string) => {
  const token = getUserToken();
  return useQuery({
    queryKey: QUERY_KEYS.taskCounts(date, token),
    queryFn: () => tasksApi.getTaskCounts(date),
    enabled: Boolean(token),
    staleTime: 1000 * 30,
  });
};

/**
 * Fetch a single task by ID for the details/edit modal.
 */
export const useTaskDetails = (taskId: string | null | undefined) => {
  const token = getUserToken();
  return useQuery({
    queryKey: QUERY_KEYS.taskDetails(taskId || null, token),
    queryFn: () => tasksApi.getTaskById(taskId!),
    enabled: Boolean(token && taskId),
    staleTime: 1000 * 60,
  });
};

/**
 * Create a new task.
 */
export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (task: Partial<Task>) => tasksApi.createTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task-counts'] });
    },
  });
};

/**
 * Update an existing task.
 */
export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, task }: { id: string; task: Partial<Task> }) =>
      tasksApi.updateTask(id, task),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task-counts'] });
      queryClient.invalidateQueries({ queryKey: ['task', variables.id] });
    },
  });
};

/**
 * Delete a task.
 */
export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => tasksApi.deleteTask(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task-counts'] });
      queryClient.removeQueries({ queryKey: ['task', id] });
    },
  });
};

// Legacy bulk tasks hooks
export const useTasksQuery = () => {
  const token = getUserToken();
  return useQuery({
    queryKey: QUERY_KEYS.tasks(token),
    queryFn: () => tasksApi.getTasks(token!),
    enabled: Boolean(token),
    staleTime: 1000 * 60,
  });
};

export const useUpdateTasksMutation = () => {
  const queryClient = useQueryClient();
  const token = getUserToken();
  return useMutation({
    mutationFn: (tasks: Task[]) => tasksApi.updateTasks(token!, tasks),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task-counts'] });
    },
  });
};

// ==========================================
// PROJECTS HOOKS
// ==========================================
export const useProjectsQuery = () => {
  const token = getUserToken();
  return useQuery({
    queryKey: QUERY_KEYS.projects(token),
    queryFn: () => projectsApi.getProjects(token!),
    enabled: Boolean(token),
    staleTime: 1000 * 60,
  });
};

export const useUpdateProjectsMutation = () => {
  const queryClient = useQueryClient();
  const token = getUserToken();
  return useMutation({
    mutationFn: (projects: Project[]) => projectsApi.updateProjects(token!, projects),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.projects(token) });
      queryClient.invalidateQueries({ queryKey: ['task-counts'] });
    },
  });
};

// ==========================================
// COMPLETED TASKS HOOKS
// ==========================================
export const useCompletedTasksQuery = () => {
  const token = getUserToken();
  return useQuery({
    queryKey: QUERY_KEYS.completedTasks(token),
    queryFn: () => completedTasksApi.getCompletedTasks(token!),
    enabled: Boolean(token),
    staleTime: 1000 * 60,
  });
};

export const useUpdateCompletedTasksMutation = () => {
  const queryClient = useQueryClient();
  const token = getUserToken();
  return useMutation({
    mutationFn: (tasks: CompletedTask[]) => completedTasksApi.updateCompletedTasks(token!, tasks),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.completedTasks(token) });
    },
  });
};

// ==========================================
// THEME HOOKS
// ==========================================
export const useThemeQuery = () => {
  const token = getUserToken();
  return useQuery({
    queryKey: QUERY_KEYS.theme(token),
    queryFn: () => themeApi.getTheme(token!),
    enabled: Boolean(token),
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateThemeMutation = () => {
  const queryClient = useQueryClient();
  const token = getUserToken();
  return useMutation({
    mutationFn: (theme: { mode: ThemeMode; color: ThemeColors }) =>
      themeApi.updateTheme(token!, theme),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.theme(token) });
    },
  });
};

// ==========================================
// AUTH HOOKS
// ==========================================
export const useCurrentUserQuery = () => {
  const token = getUserToken();
  return useQuery({
    queryKey: QUERY_KEYS.currentUser(token),
    queryFn: () => authApi.getCurrentUser(token!),
    enabled: Boolean(token),
    staleTime: 1000 * 60 * 10,
  });
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (credentials: { email: string; password?: string }) =>
      authApi.login(credentials),
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEYS.currentUser(data.token), data.user);
    },
  });
};

// ==========================================
// FEEDBACK HOOKS
// ==========================================
export const useSubmitFeedbackMutation = () => {
  return useMutation({
    mutationFn: (feedback: {
      firstName: string;
      lastName: string;
      email: string;
      message: string;
      dateAndTime?: string;
    }) => feedbackApi.submitFeedback(feedback),
  });
};
