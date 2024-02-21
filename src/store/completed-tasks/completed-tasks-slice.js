import { createSlice } from "@reduxjs/toolkit"

const initialState = { completedTasks: null, changed: false }

const completedTasksSlice = createSlice({
      initialState,
      name: "completedTasks",
      reducers: {
            getCompletedTasks(state, action) {
                  state.completedTasks = action.payload
                  state.changed = false
            },
            addCompletedTasks(state, action) {
                  state.completedTasks = [...state.completedTasks, action.payload]
                  state.changed = true
            },
      }
})

export const completedTasksAction = completedTasksSlice.actions
export default completedTasksSlice.reducer