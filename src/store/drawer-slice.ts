import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DrawerState {
  isOpen: boolean;
}

const initialState: DrawerState = { isOpen: true };

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    drawerToggle: {
      reducer(state, action: PayloadAction<boolean | undefined>) {
        if (typeof action.payload === 'boolean') {
          state.isOpen = action.payload;
        } else {
          state.isOpen = !state.isOpen;
        }
      },
      prepare(payload?: boolean) {
        return { payload };
      },
    },
  },
});

export const drawerActions = drawerSlice.actions;
export default drawerSlice.reducer;
