import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../../types";

export interface ProjectsState {
  projects: Project[] | null;
  currentProject: Project | null;
  changed: boolean;
}

const initialState: ProjectsState = {
  projects: null,
  currentProject: null,
  changed: false,
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    getProjects(state, action: PayloadAction<Project[]>) {
      state.projects = action.payload;
      state.changed = false;
    },
    getProjectById(state, action: PayloadAction<string>) {
      if (Array.isArray(state.projects)) {
        state.currentProject =
          state.projects.find((project) => project.projectId === action.payload) || null;
      }
    },
    addProject(state, action: PayloadAction<Project>) {
      if (Array.isArray(state.projects)) {
        state.projects = [...state.projects, action.payload];
      } else {
        state.projects = [action.payload];
      }
      state.changed = true;
    },
    deleteProject(state, action: PayloadAction<string>) {
      if (Array.isArray(state.projects)) {
        state.projects = state.projects.filter(
          (project) => project.projectId !== action.payload
        );
      }
      state.changed = true;
    },
  },
});

export const projectActions = projectSlice.actions;
export default projectSlice.reducer;
