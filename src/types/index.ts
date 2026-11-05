export interface TaskProject {
  projectTitle: string;
  projectId: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  date?: string | null;
  project?: TaskProject | null;
  completed?: boolean;
}

export interface UpcomingTaskGroup {
  title: string;
  tasks: Task[];
}

export interface Project {
  projectId: string;
  projectTitle: string;
  color?: string;
}

export interface CompletedTask {
  id: string;
  title: string;
  description?: string;
  date?: string | null;
  project?: TaskProject | null;
  completedAt?: string;
  completionDate?: string;
}

export interface User {
  id: string | number;
  email: string;
  password?: string;
  name?: string;
  avatar?: string;
  [key: string]: any;
}

export interface ThemeColors {
  bgColor: string;
  secondaryBg: string;
  bgHover: string;
  textColor: string;
  textHover: string;
  mainColor: string;
}

export type ThemeMode = 'dark' | 'light' | '';

export interface ThemeState {
  mode: ThemeMode;
  color: ThemeColors;
  changed?: boolean;
  themeIsLoading?: boolean;
}

export type ModalType =
  | 'add-project'
  | 'delete-project'
  | 'add-task'
  | 'edit-task'
  | 'delete-task'
  | 'search'
  | null;

export interface NotificationPayload {
  title: string;
  undo?: boolean | null;
}

export interface FeedbackData {
  title: string;
  message: string;
  email?: string;
  [key: string]: any;
}
