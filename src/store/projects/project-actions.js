import { URL } from "../../utils/constants"
import { projectActions } from "./project-slice"
import { getUserToken } from "../../utils/userAuth"


export const fetchProjectsList = () => {
      return async (dispatch) => {
            dispatch(projectActions.getProjects('Loading'))
            const res = await fetch(URL + getUserToken() + '/projects.json')
            if (!res.ok) return
            const projectsData = await res.json()
            const data = projectsData === "" || projectsData === null || projectsData === undefined ? [] : projectsData

            dispatch(projectActions.getProjects(data))
      }
}

export const updateProjects = (projectsList) => {
      return async () => {
            await fetch(URL + getUserToken() + "/projects.json", { method: 'PUT', body: JSON.stringify(projectsList) })
      }

}