import { projectActions } from "./project-slice";
import { getUserToken } from "../../utils/userAuth";
import { projectsApi } from "../../api";
import { Project } from "../../types";

export const fetchProjectsList = () => {
  return async (dispatch: any) => {
    const token = getUserToken();
    if (!token) return;

    try {
      const data = await projectsApi.getProjects(token);
      dispatch(projectActions.getProjects(data));
    } catch (err) {
      console.error('fetchProjectsList error:', err);
      dispatch(projectActions.getProjects([]));
    }
  };
};

export const updateProjects = (projects: Project[] | null) => {
  return async (dispatch: any) => {
    const token = getUserToken();
    if (!token || !projects) return;

    try {
      await projectsApi.updateProjects(token, projects);
      dispatch(projectActions.getProjects(projects));
    } catch (err) {
      console.error('updateProjects error:', err);
    }
  };
};
