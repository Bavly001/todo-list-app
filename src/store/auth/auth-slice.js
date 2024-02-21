import { createSlice } from "@reduxjs/toolkit";
import { removeUserToken } from "../../utils/userAuth";

const initialState = { isUserAuthenticated: false, currentUser: null, loading: false, failed: false, error: false, appIsLoading: false }

const authSlice = createSlice({
      name: 'auth',
      initialState,
      reducers: {
            loginRequest(state) {
                  state.isUserAuthenticated = false
                  state.loading = true
                  state.currentUser = null
            },
            loginSucceeded(state, action) {
                  state.isUserAuthenticated = true
                  state.currentUser = action.payload
                  state.loading = false
                  state.failed = false
            },
            loginFailed(state) {
                  state.isUserAuthenticated = false
                  state.loading = false
                  state.failed = true
                  state.currentUser = null
                  removeUserToken()
            },
            loginError(state) {
                  state.isUserAuthenticated = false
                  state.loading = false
                  state.failed = false
                  state.currentUser = null
                  state.error = true
                  removeUserToken()
            },
            logout(state) {
                  state.isUserAuthenticated = false;
                  state.currentUser = null;
                  state.loading = false;
                  state.failed = false;
                  state.error = false
                  removeUserToken()
            },
            appStartsLoading(state) {
                  state.appIsLoading = true;
            },
            appStopLoading(state) {
                  state.appIsLoading = false;
            }

      }
})

export const authActions = authSlice.actions
export default authSlice.reducer