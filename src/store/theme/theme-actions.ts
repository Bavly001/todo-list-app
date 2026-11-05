import { getUserToken } from "../../utils/userAuth";
import { themeActions } from "./theme-slice";
import { themeApi } from "../../api";
import { ThemeColors, ThemeMode } from "../../types";

export const getUserTheme = () => {
  return async (dispatch: any) => {
    const token = getUserToken();
    if (!token) {
      dispatch(themeActions.themeStopsLoading());
      return;
    }

    try {
      const themeData = await themeApi.getTheme(token);
      if (themeData) dispatch(themeActions.addTheme(themeData));
    } catch (err) {
      console.error('getUserTheme error:', err);
    } finally {
      dispatch(themeActions.themeStopsLoading());
    }
  };
};

export const setUserTheme = (theme: { mode: ThemeMode; color: ThemeColors }) => {
  return async (dispatch: any) => {
    const token = getUserToken();
    if (!token) return;

    try {
      await themeApi.updateTheme(token, theme);
      dispatch(themeActions.setTheme());
    } catch (err) {
      console.error('setUserTheme error:', err);
    }
  };
};
