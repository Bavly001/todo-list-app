import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserToken, removeUserToken } from "../../utils/userAuth";
import { User } from "../../types";

const initialToken = getUserToken();

export interface AuthState {
  isUserAuthenticated: boolean;
  currentUser: User | null;
  loading: boolean;
  failed: boolean;
  error: boolean;
  appIsLoading: boolean;
}

const initialState: AuthState = {
  isUserAuthenticated: Boolean(initialToken),
  currentUser: null,
  loading: false,
  failed: false,
  error: false,
  appIsLoading: Boolean(initialToken),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.failed = false;
      state.error = false;
    },
    loginSucceeded(state, action: PayloadAction<User>) {
      state.isUserAuthenticated = true;
      state.currentUser = action.payload;
      state.loading = false;
      state.failed = false;
      state.error = false;
    },
    loginFailed(state) {
      state.isUserAuthenticated = false;
      state.loading = false;
      state.failed = true;
      state.currentUser = null;
      removeUserToken();
    },
    loginError(state) {
      state.isUserAuthenticated = false;
      state.loading = false;
      state.failed = false;
      state.currentUser = null;
      state.error = true;
      removeUserToken();
    },
    logout(state) {
      state.isUserAuthenticated = false;
      state.currentUser = null;
      state.loading = false;
      state.failed = false;
      state.error = false;
      removeUserToken();
    },
    appStartsLoading(state) {
      state.appIsLoading = true;
    },
    appStopLoading(state) {
      state.appIsLoading = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
