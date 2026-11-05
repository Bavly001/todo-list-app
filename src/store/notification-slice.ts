import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationPayload } from "../types";

export interface NotificationState {
  title: string | null;
  undo: boolean | null;
  undoClicked: boolean | null;
}

const initialState: NotificationState = {
  title: null,
  undo: null,
  undoClicked: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action: PayloadAction<NotificationPayload>) {
      state.title = action.payload.title;
      state.undo = action.payload.undo ?? null;
      state.undoClicked = null;
    },
    undoClicked(state) {
      state.undoClicked = true;
    },
    hideNotification(state) {
      state.title = null;
      state.undo = null;
      state.undoClicked = null;
    },
  },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice.reducer;
