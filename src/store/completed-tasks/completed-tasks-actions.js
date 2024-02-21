import { URL } from "../../utils/constants"
import { completedTasksAction } from "./completed-tasks-slice"
import { getUserToken } from "../../utils/userAuth"


export const fetchCompletedTasks = () => {
      return async (dispatch) => {
            dispatch(completedTasksAction.getCompletedTasks('Loading'))

            const fetchData = async () => {
                  const res = await fetch(URL + getUserToken() + '/completed-tasks.json')
                  if (!res.ok) return
                  const data = await res.json()
                  return data
            }

            const completedTasks = await fetchData()
            const data = completedTasks === "" || completedTasks === null || completedTasks === undefined ? [] : completedTasks
            dispatch(completedTasksAction.getCompletedTasks(data))
      }
}

export const updateCompletedTasks = (tasks) => {
      return async (dispatch) => {
            await fetch(URL + getUserToken() + "/completed-tasks.json", { method: 'PUT', body: JSON.stringify(tasks) })
            dispatch(completedTasksAction.getCompletedTasks(tasks))
      }
}