import { createSlice } from "@reduxjs/toolkit";

const initialState = {
      mode: '', color: {
            bgColor: '',
            secondaryBg: '',
            bgHover: '',
            textColor: '',
            textHover: '',
            mainColor: ''
      },
      changed: false,
      themeIsLoading: true
}

const themeSlice = createSlice({
      name: 'theme',
      initialState,
      reducers: {
            changeThemeMode(state, action) {
                  state.mode = action.payload
                  state.changed = true
            },
            changeColorBlue(state) {
                  if (state.mode === 'dark')
                        state.color = {
                              bgColor: 'bg-blue-400',
                              secondaryBg: 'bg-blue-900',
                              bgHover: 'hover:bg-blue-300',
                              textColor: 'text-blue-400',
                              textHover: 'hover:text-blue-300',
                              mainColor: 'blue'
                        }
                  else state.color = {
                        bgColor: 'bg-blue-600',
                        secondaryBg: 'bg-blue-100',
                        bgHover: 'hover:bg-blue-700',
                        textColor: 'text-blue-600',
                        textHover: 'hover:text-blue-700',
                        mainColor: 'blue'
                  }
                  state.changed = true
            },
            changeColorCyan(state) {
                  if (state.mode === 'dark')
                        state.color = {
                              bgColor: 'bg-cyan-400',
                              secondaryBg: 'bg-cyan-900',
                              bgHover: 'hover:bg-cyan-300',
                              textColor: 'text-cyan-400',
                              textHover: 'hover:text-cyan-300',
                              mainColor: 'cyan'
                        }
                  else state.color = {
                        bgColor: 'bg-cyan-600',
                        secondaryBg: 'bg-cyan-100',
                        bgHover: 'hover:bg-cyan-700',
                        textColor: 'text-cyan-600',
                        textHover: 'hover:text-cyan-700',
                        mainColor: 'cyan'
                  }
                  state.changed = true
            },
            changeColorTeal(state) {
                  if (state.mode === 'dark')
                        state.color = {
                              bgColor: 'bg-teal-400',
                              secondaryBg: 'bg-teal-900',
                              bgHover: 'hover:bg-teal-300',
                              textColor: 'text-teal-400',
                              textHover: 'hover:text-teal-300',
                              mainColor: 'teal'
                        }
                  else state.color = {
                        bgColor: 'bg-teal-600',
                        secondaryBg: 'bg-teal-100',
                        bgHover: 'hover:bg-teal-700',
                        textColor: 'text-teal-600',
                        textHover: 'hover:text-teal-700',
                        mainColor: 'teal'
                  }
                  state.changed = true
            },
            changeColorGreen(state) {
                  if (state.mode === 'dark')
                        state.color = {
                              bgColor: 'bg-green-400',
                              secondaryBg: 'bg-green-900',
                              bgHover: 'hover:bg-green-300',
                              textColor: 'text-green-400',
                              textHover: 'hover:text-green-300',
                              mainColor: 'green'
                        }
                  else state.color = {
                        bgColor: 'bg-green-600',
                        secondaryBg: 'bg-green-100',
                        bgHover: 'hover:bg-green-700',
                        textColor: 'text-green-600',
                        textHover: 'hover:text-green-700',
                        mainColor: 'green'
                  }
                  state.changed = true
            },
            changeColorLime(state) {
                  if (state.mode === 'dark')
                        state.color = {
                              bgColor: 'bg-lime-400',
                              secondaryBg: 'bg-lime-900',
                              bgHover: 'hover:bg-lime-300',
                              textColor: 'text-lime-400',
                              textHover: 'hover:text-lime-300',
                              mainColor: 'lime'
                        }
                  else state.color = {
                        bgColor: 'bg-lime-600',
                        secondaryBg: 'bg-lime-100',
                        bgHover: 'hover:bg-lime-700',
                        textColor: 'text-lime-600',
                        textHover: 'hover:text-lime-700',
                        mainColor: 'lime'
                  }
                  state.changed = true
            },
            changeColorOrange(state) {
                  if (state.mode === 'dark')
                        state.color = {
                              bgColor: 'bg-orange-400',
                              secondaryBg: 'bg-orange-900',
                              bgHover: 'hover:bg-orange-300',
                              textColor: 'text-orange-400',
                              textHover: 'hover:text-orange-300',
                              mainColor: 'orange'
                        }
                  else state.color = {
                        bgColor: 'bg-orange-600',
                        secondaryBg: 'bg-orange-100',
                        bgHover: 'hover:bg-orange-700',
                        textColor: 'text-orange-600',
                        textHover: 'hover:text-orange-700',
                        mainColor: 'orange'
                  }
                  state.changed = true
            },
            changeColorPink(state) {
                  if (state.mode === 'dark')
                        state.color = {
                              bgColor: 'bg-pink-400',
                              secondaryBg: 'bg-pink-900',
                              bgHover: 'hover:bg-pink-300',
                              textColor: 'text-pink-400',
                              textHover: 'hover:text-pink-300',
                              mainColor: 'pink'
                        }
                  else state.color = {
                        bgColor: 'bg-pink-600',
                        secondaryBg: 'bg-pink-100',
                        bgHover: 'hover:bg-pink-700',
                        textColor: 'text-pink-600',
                        textHover: 'hover:text-pink-700',
                        mainColor: 'pink'
                  }
                  state.changed = true
            },
            changeColorPurple(state) {
                  if (state.mode === 'dark')
                        state.color = {
                              bgColor: 'bg-purple-400',
                              secondaryBg: 'bg-purple-900',
                              bgHover: 'hover:bg-purple-300',
                              textColor: 'text-purple-400',
                              textHover: 'hover:text-purple-300',
                              mainColor: 'purple'
                        }
                  else state.color = {
                        bgColor: 'bg-purple-600',
                        secondaryBg: 'bg-purple-100',
                        bgHover: 'hover:bg-purple-700',
                        textColor: 'text-purple-600',
                        textHover: 'hover:text-purple-700',
                        mainColor: 'purple'
                  }
                  state.changed = true
            },
            addTheme(state, action) {
                  state.mode = action.payload.mode
                  state.color = action.payload.color
            },
            setTheme(state) {
                  state.changed = false
            },
            themeStopsLoading(state) {
                  state.themeIsLoading = false
            }

      }
})

export const themeActions = themeSlice.actions
export default themeSlice.reducer