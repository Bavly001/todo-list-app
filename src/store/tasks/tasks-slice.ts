import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { shortMonthFormat } from "../../utils/dateFormatter";
import { Task, UpcomingTaskGroup } from "../../types";

export interface TasksState {
  tasks: Task[] | 'Loading' | null;
  nonProjectsTasks: Task[] | 'Loading' | null;
  todayTasks: Task[] | 'Loading' | null;
  upcomingTasks: UpcomingTaskGroup[] | 'Loading' | null;
  currentTask: Task | null;
  changed: boolean;
}

const initialState: TasksState = {
  tasks: null,
  nonProjectsTasks: null,
  todayTasks: null,
  upcomingTasks: null,
  currentTask: null,
  changed: false,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    getTasks(state, action: PayloadAction<Task[] | 'Loading'>) {
      state.tasks = action.payload;
      if (action.payload === 'Loading') {
        state.todayTasks = 'Loading';
        state.nonProjectsTasks = 'Loading';
        state.upcomingTasks = 'Loading';
      } else {
        const todayStr = shortMonthFormat(new Date());
        state.todayTasks = action.payload.filter((task) => task.date === todayStr);
        state.nonProjectsTasks = action.payload.filter((task) => !task.project);
        const dates = [...new Set(action.payload.map((task) => task.date))].filter(
          (date): date is string => Boolean(date)
        );
        state.upcomingTasks = dates
          .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
          .map((date) => ({
            title: date === todayStr ? "Today (" + date : date,
            tasks: (action.payload as Task[]).filter((task) => task.date === date),
          }));
      }
      state.changed = false;
    },
    getTaskById(state, action: PayloadAction<string>) {
      if (Array.isArray(state.tasks)) {
        state.currentTask = state.tasks.find((task) => task.id === action.payload) || null;
      }
    },
    clearCurrentTask(state) {
      state.currentTask = null;
    },
    addTask(state, action: PayloadAction<Task>) {
      if (Array.isArray(state.tasks)) {
        state.tasks = [...state.tasks, action.payload];
      } else {
        state.tasks = [action.payload];
      }
      state.changed = true;
    },
    updateTask(state, action: PayloadAction<Task>) {
      if (Array.isArray(state.tasks)) {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      }
      state.changed = true;
    },
    deleteTask(state, action: PayloadAction<string>) {
      if (Array.isArray(state.tasks)) {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      }
      state.changed = true;
    },
    deleteTasksByProjectId(state, action: PayloadAction<string>) {
      if (Array.isArray(state.tasks)) {
        state.tasks = state.tasks.filter((task) => task.project?.projectId !== action.payload);
      }
      state.changed = true;
    },
  },
});

export const tasksActions = tasksSlice.actions;
export default tasksSlice.reducer;
