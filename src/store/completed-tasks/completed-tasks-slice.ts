import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompletedTask } from "../../types";

export interface CompletedTasksState {
  completedTasks: CompletedTask[] | 'Loading' | null;
  changed: boolean;
}

const initialState: CompletedTasksState = {
  completedTasks: null,
  changed: false,
};

const completedTasksSlice = createSlice({
  initialState,
  name: "completedTasks",
  reducers: {
    getCompletedTasks(state, action: PayloadAction<CompletedTask[] | 'Loading'>) {
      state.completedTasks = action.payload;
      state.changed = false;
    },
    addCompletedTasks(state, action: PayloadAction<CompletedTask>) {
      if (Array.isArray(state.completedTasks)) {
        state.completedTasks = [...state.completedTasks, action.payload];
      } else {
        state.completedTasks = [action.payload];
      }
      state.changed = true;
    },
  },
});

export const completedTasksAction = completedTasksSlice.actions;
export default completedTasksSlice.reducer;
