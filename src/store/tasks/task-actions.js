import { URL } from "../../utils/constants"
import { tasksActions } from "./tasks-slice"
import { getUserToken } from "../../utils/userAuth"


export const fetchTasksData = () => {
      return async (dispatch) => {
            dispatch(tasksActions.getTasks('Loading'))
            const fetchData = async () => {
                  const res = await fetch(URL + getUserToken() + "/tasks.json")
                  if (!res.ok) return
                  const data = await res.json()
                  return data
            }

            const tasksData = await fetchData()
            const data = tasksData === "" || tasksData === null || tasksData === undefined ? [] : tasksData.sort((a, b) => new Date(a?.date) - new Date(b?.date))
            dispatch(tasksActions.getTasks(data))
      }
}

export const updateTasks = (tasks) => {
      return async (dispatch) => {
            await fetch(URL + getUserToken() + "/tasks.json", { method: 'PUT', body: JSON.stringify(tasks) })
            dispatch(tasksActions.getTasks(tasks))
      }
}