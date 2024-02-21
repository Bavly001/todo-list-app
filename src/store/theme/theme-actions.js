import { URL } from "../../utils/constants"
import { getUserToken } from "../../utils/userAuth"
import { themeActions } from "./theme-slice"

export const getUserTheme = () => {
      return async (dispatch) => {
            const res = await fetch(URL + getUserToken() + '/theme.json')
            if (!res.ok) return
            const themeData = await res.json()
            if (themeData)
                  dispatch(themeActions.addTheme(themeData))

            dispatch(themeActions.themeStopsLoading())
      }
}
export const setUserTheme = (theme) => {
      return async (dispatch) => {
            await fetch(URL + getUserToken() + '/theme.json', { method: 'PUT', body: JSON.stringify(theme) })
            dispatch(themeActions.setTheme())
      }
}