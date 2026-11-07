import { ThemeColors, ThemeMode } from "../../types";

export const DEFAULT_THEME_MODE: ThemeMode = "light";

export const THEME_COLOR_MAP: Record<string, { light: ThemeColors; dark: ThemeColors }> = {
  blue: {
    light: {
      bgColor: 'bg-blue-600',
      secondaryBg: 'bg-blue-100',
      bgHover: 'hover:bg-blue-700',
      textColor: 'text-blue-600',
      textHover: 'hover:text-blue-700',
      mainColor: 'blue',
    },
    dark: {
      bgColor: 'bg-blue-400',
      secondaryBg: 'bg-blue-900',
      bgHover: 'hover:bg-blue-300',
      textColor: 'text-blue-400',
      textHover: 'hover:text-blue-300',
      mainColor: 'blue',
    },
  },
  cyan: {
    light: {
      bgColor: 'bg-cyan-600',
      secondaryBg: 'bg-cyan-100',
      bgHover: 'hover:bg-cyan-700',
      textColor: 'text-cyan-600',
      textHover: 'hover:text-cyan-700',
      mainColor: 'cyan',
    },
    dark: {
      bgColor: 'bg-cyan-400',
      secondaryBg: 'bg-cyan-900',
      bgHover: 'hover:bg-cyan-300',
      textColor: 'text-cyan-400',
      textHover: 'hover:text-cyan-300',
      mainColor: 'cyan',
    },
  },
  teal: {
    light: {
      bgColor: 'bg-teal-600',
      secondaryBg: 'bg-teal-100',
      bgHover: 'hover:bg-teal-700',
      textColor: 'text-teal-600',
      textHover: 'hover:text-teal-700',
      mainColor: 'teal',
    },
    dark: {
      bgColor: 'bg-teal-400',
      secondaryBg: 'bg-teal-900',
      bgHover: 'hover:bg-teal-300',
      textColor: 'text-teal-400',
      textHover: 'hover:text-teal-300',
      mainColor: 'teal',
    },
  },
  green: {
    light: {
      bgColor: 'bg-green-600',
      secondaryBg: 'bg-green-100',
      bgHover: 'hover:bg-green-700',
      textColor: 'text-green-600',
      textHover: 'hover:text-green-700',
      mainColor: 'green',
    },
    dark: {
      bgColor: 'bg-green-400',
      secondaryBg: 'bg-green-900',
      bgHover: 'hover:bg-green-300',
      textColor: 'text-green-400',
      textHover: 'hover:text-green-300',
      mainColor: 'green',
    },
  },
  lime: {
    light: {
      bgColor: 'bg-lime-600',
      secondaryBg: 'bg-lime-100',
      bgHover: 'hover:bg-lime-700',
      textColor: 'text-lime-600',
      textHover: 'hover:text-lime-700',
      mainColor: 'lime',
    },
    dark: {
      bgColor: 'bg-lime-400',
      secondaryBg: 'bg-lime-900',
      bgHover: 'hover:bg-lime-300',
      textColor: 'text-lime-400',
      textHover: 'hover:text-lime-300',
      mainColor: 'lime',
    },
  },
  orange: {
    light: {
      bgColor: 'bg-orange-600',
      secondaryBg: 'bg-orange-100',
      bgHover: 'hover:bg-orange-700',
      textColor: 'text-orange-600',
      textHover: 'hover:text-orange-700',
      mainColor: 'orange',
    },
    dark: {
      bgColor: 'bg-orange-400',
      secondaryBg: 'bg-orange-900',
      bgHover: 'hover:bg-orange-300',
      textColor: 'text-orange-400',
      textHover: 'hover:text-orange-300',
      mainColor: 'orange',
    },
  },
  pink: {
    light: {
      bgColor: 'bg-pink-600',
      secondaryBg: 'bg-pink-100',
      bgHover: 'hover:bg-pink-700',
      textColor: 'text-pink-600',
      textHover: 'hover:text-pink-700',
      mainColor: 'pink',
    },
    dark: {
      bgColor: 'bg-pink-400',
      secondaryBg: 'bg-pink-900',
      bgHover: 'hover:bg-pink-300',
      textColor: 'text-pink-400',
      textHover: 'hover:text-pink-300',
      mainColor: 'pink',
    },
  },
  purple: {
    light: {
      bgColor: 'bg-purple-600',
      secondaryBg: 'bg-purple-100',
      bgHover: 'hover:bg-purple-700',
      textColor: 'text-purple-600',
      textHover: 'hover:text-purple-700',
      mainColor: 'purple',
    },
    dark: {
      bgColor: 'bg-purple-400',
      secondaryBg: 'bg-purple-900',
      bgHover: 'hover:bg-purple-300',
      textColor: 'text-purple-400',
      textHover: 'hover:text-purple-300',
      mainColor: 'purple',
    },
  },
};

export const DEFAULT_THEME_COLOR: ThemeColors = THEME_COLOR_MAP.blue.light;
export const DEFAULT_DARK_THEME_COLOR: ThemeColors = THEME_COLOR_MAP.blue.dark;

export function resolveColorPalette(mainColorName: string | undefined, mode: ThemeMode): ThemeColors {
  const colorKey = mainColorName && THEME_COLOR_MAP[mainColorName] ? mainColorName : 'blue';
  const modeKey = mode === 'dark' ? 'dark' : 'light';
  return THEME_COLOR_MAP[colorKey][modeKey];
}
