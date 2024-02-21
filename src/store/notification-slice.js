import { createSlice } from "@reduxjs/toolkit";

const initialState = { title: null, undo: null, undoClicked: null }

const notificationSlice = createSlice({
      initialState,
      name: "notification",
      reducers: {
            showNotification(state, action) {
                  state.title = action.payload.title;
                  state.undo = action.payload.undo ?? null;
            },
            undoClicked(state) {
                  state.undoClicked = true
            },
            hideNotification(state) {
                  state.title = null;
                  state.undo = null;
                  state.undoClicked = null;
            }
      }
})

export const notificationActions = notificationSlice.actions
export default notificationSlice.reducer