import { getUserToken, setUserToken } from "../../utils/userAuth";
import { authActions } from "./auth-slice";
import { authApi } from "../../api";

export const getUser = (userData: { email: string; password?: string }) => {
  return async (dispatch: any) => {
    dispatch(authActions.loginRequest());
    try {
      const res = await authApi.login(userData);
      if (res?.user && res?.token) {
        setUserToken(res.token);
        dispatch(authActions.loginSucceeded(res.user));
      } else {
        dispatch(authActions.loginFailed());
      }
    } catch (err) {
      console.error('Login request failed:', err);
      dispatch(authActions.loginError());
    }
  };
};

export const getCurrentUser = () => {
  return async (dispatch: any) => {
    const token = getUserToken();
    if (!token) {
      dispatch(authActions.appStopLoading());
      return;
    }
    dispatch(authActions.appStartsLoading());
    try {
      const currentUser = await authApi.getCurrentUser(token);
      if (currentUser) {
        dispatch(authActions.loginSucceeded(currentUser));
      } else {
        dispatch(authActions.loginFailed());
      }
    } catch (err) {
      console.error('getCurrentUser request failed:', err);
      dispatch(authActions.loginError());
    } finally {
      dispatch(authActions.appStopLoading());
    }
  };
};
