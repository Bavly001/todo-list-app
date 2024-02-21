import { createSlice } from "@reduxjs/toolkit";

const initialState = { isOpen: true }

const drawerSlice = createSlice({
      name: 'drawer',
      initialState,
      reducers: {
            drawerToggle(state, action) {
                  if (action)
                        state.isOpen = action.payload ?? !state.isOpen
            }
      }
})

export const drawerActions = drawerSlice.actions
export default drawerSlice.reducer