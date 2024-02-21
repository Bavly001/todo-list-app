import { createSlice } from "@reduxjs/toolkit";

const initialState = { currentModal: null }

const modalSlice = createSlice({
      name: 'modal',
      initialState,
      reducers: {
            addProject(state) {
                  state.currentModal = 'add-project'
            },
            deleteProject(state) {
                  state.currentModal = 'delete-project'
            },
            addTask(state) {
                  state.currentModal = 'add-task'
            },
            editTask(state) {
                  state.currentModal = 'edit-task'
            },
            deleteTask(state) {
                  state.currentModal = 'delete-task'
            },
            search(state) {
                  state.currentModal = 'search'
            },
            close(state) {
                  state.currentModal = null
            },
      }
})

export const modalActions = modalSlice.actions
export default modalSlice.reducer