import { createSlice } from "@reduxjs/toolkit";

const initialState = {
      projects: null,
      currentProject: null,
      changed: false
}

const projectSlice = createSlice({
      name: 'projects',
      initialState,
      reducers: {
            getProjects(state, action) {
                  state.projects = action.payload
                  state.changed = false
            },
            getProjectById(state, action) {
                  state.currentProject = state.projects.find((project) => project.projectId === action.payload);
            },
            addProject(state, action) {
                  state.projects = [...state.projects, action.payload]
                  state.changed = true
            },
            deleteProject(state, action) {
                  state.projects = state.projects.filter((project) => project.projectId !== action.payload)
                  state.changed = true
            },
      }
})

export const projectActions = projectSlice.actions
export default projectSlice.reducer