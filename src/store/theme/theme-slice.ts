import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeColors, ThemeMode, ThemeState } from "../../types";
import {
  DEFAULT_THEME_COLOR,
  DEFAULT_THEME_MODE,
  resolveColorPalette,
} from "./theme-constants";

const initialState: ThemeState = {
  mode: DEFAULT_THEME_MODE,
  color: DEFAULT_THEME_COLOR,
  changed: false,
  themeIsLoading: true,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeThemeMode(state, action: PayloadAction<ThemeMode>) {
      const newMode: ThemeMode = action.payload || "light";
      state.mode = newMode;
      state.color = resolveColorPalette(state.color?.mainColor, newMode);
      state.changed = true;
    },
    changeColorBlue(state) {
      state.color = resolveColorPalette("blue", state.mode);
      state.changed = true;
    },
    changeColorCyan(state) {
      state.color = resolveColorPalette("cyan", state.mode);
      state.changed = true;
    },
    changeColorTeal(state) {
      state.color = resolveColorPalette("teal", state.mode);
      state.changed = true;
    },
    changeColorGreen(state) {
      state.color = resolveColorPalette("green", state.mode);
      state.changed = true;
    },
    changeColorLime(state) {
      state.color = resolveColorPalette("lime", state.mode);
      state.changed = true;
    },
    changeColorOrange(state) {
      state.color = resolveColorPalette("orange", state.mode);
      state.changed = true;
    },
    changeColorPink(state) {
      state.color = resolveColorPalette("pink", state.mode);
      state.changed = true;
    },
    changeColorPurple(state) {
      state.color = resolveColorPalette("purple", state.mode);
      state.changed = true;
    },
    addTheme(
      state,
      action: PayloadAction<{ mode?: ThemeMode | null; color?: ThemeColors | null } | null | undefined>
    ) {
      const payload = action.payload;

      // If API provided a mode, keep it; else keep Frontend constant 'light'
      const hasMode =
        payload &&
        typeof payload.mode === "string" &&
        payload.mode.trim().length > 0;
      const finalMode: ThemeMode = hasMode
        ? (payload.mode as ThemeMode)
        : DEFAULT_THEME_MODE;

      // If API provided a color, keep it; else keep Frontend constant blue color
      let finalColor: ThemeColors;
      if (
        payload?.color &&
        typeof payload.color.mainColor === "string" &&
        payload.color.mainColor.trim().length > 0
      ) {
        finalColor = resolveColorPalette(payload.color.mainColor, finalMode);
      } else {
        finalColor = resolveColorPalette("blue", finalMode);
      }

      state.mode = finalMode;
      state.color = finalColor;
      state.changed = false;
    },
    setTheme(state) {
      state.changed = false;
    },
    themeStopsLoading(state) {
      state.themeIsLoading = false;
    },
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
