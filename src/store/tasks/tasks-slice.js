import { createSlice } from "@reduxjs/toolkit";
import { shortMonthFormat } from "../../utils/dateFormatter";

const initialState = { tasks: null, nonProjectsTasks: null, todayTasks: null, upcomingTasks: null, currentTask: null, changed: false }

const tasksSlice = createSlice({
      name: 'tasks',
      initialState,
      reducers: {
            getTasks(state, action) {
                  state.tasks = action.payload
                  state.todayTasks = action.payload !== 'Loading' ? action.payload.filter((task) => task.date === shortMonthFormat(new Date())) : action.payload
                  state.nonProjectsTasks = action.payload !== 'Loading' ? action.payload.filter((task) => task.project === null || task.project === undefined) : action.payload
                  const dates = action.payload !== 'Loading' ? [...new Set(action.payload.map(task => task.date))].filter((date) => date) : null
                  state.upcomingTasks = action.payload !== 'Loading' ? dates.sort((a, b) => new Date(a) - new Date(b)).map(date => ({ title: date === shortMonthFormat(new Date()) ? "Today (" + date : date, tasks: action.payload.filter((task) => task.date === date) })) : action.payload
                  state.changed = false
            },
            getTaskById(state, action) {
                  state.currentTask = state.tasks.find((task) => task.id === action.payload)
            },
            clearCurrentTask(state) {
                  state.currentTask = null
            },
            addTask(state, action) {
                  state.tasks = [...state.tasks, action.payload]
                  state.changed = true
            },
            updateTask(state, action) {
                  const index = state.tasks.findIndex((task) => task.id === action.payload.id);
                  state.tasks[index] = action.payload;
                  state.changed = true
            },
            deleteTask(state, action) {
                  state.tasks = state.tasks.filter((task) => task.id !== action.payload)
                  state.changed = true
            },
            deleteTasksByProjectId(state, action) {
                  state.tasks = state.tasks.filter((task) => task.project?.projectId !== action.payload)
                  state.changed = true
            }
      }
})

export const tasksActions = tasksSlice.actions
export default tasksSlice.reducer