import { URL } from "../../utils/constants"
import { getUserToken, setUserToken } from "../../utils/userAuth"
import { authActions } from "./auth-slice"


export const getUser = (userData) => {
      return async (dispatch) => {
            dispatch(authActions.loginRequest())
            const res = await fetch(URL + 'users.json')
            if (!res.ok) {
                  dispatch(authActions.loginError())
                  return
            }
            const usersData = await res.json()
            const currentUser = usersData.find((user) => (user.email === userData.email && user.password === userData.password))
            if (currentUser) {
                  dispatch(authActions.loginSucceeded(currentUser))
                  setUserToken(currentUser.id)

            }

            else
                  dispatch(authActions.loginFailed())

      }
}

export const getCurrentUser = () => {
      return async (dispatch) => {
            dispatch(authActions.loginRequest())
            dispatch(authActions.appStartsLoading())
            const res = await fetch(URL + 'users.json')
            if (!res.ok) {
                  dispatch(authActions.loginError())
                  return
            }
            const usersData = await res.json()
            const currentUser = usersData.find((user) => (user.id === getUserToken()))
            if (currentUser) {
                  dispatch(authActions.loginSucceeded(currentUser))
                  dispatch(authActions.appStopLoading())
            }
            else {
                  dispatch(authActions.loginFailed())
                  dispatch(authActions.appStopLoading())
            }
      }
}
