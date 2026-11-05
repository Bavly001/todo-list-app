import { completedTasksAction } from "./completed-tasks-slice";
import { getUserToken } from "../../utils/userAuth";
import { completedTasksApi } from "../../api";
import { CompletedTask } from "../../types";

export const fetchCompletedTasks = () => {
  return async (dispatch: any) => {
    const token = getUserToken();
    if (!token) return;

    dispatch(completedTasksAction.getCompletedTasks('Loading'));
    try {
      const data = await completedTasksApi.getCompletedTasks(token);
      dispatch(completedTasksAction.getCompletedTasks(data));
    } catch (err) {
      console.error('fetchCompletedTasks error:', err);
      dispatch(completedTasksAction.getCompletedTasks([]));
    }
  };
};

export const updateCompletedTasks = (tasks: CompletedTask[] | null) => {
  return async (dispatch: any) => {
    const token = getUserToken();
    if (!token || !tasks) return;

    try {
      await completedTasksApi.updateCompletedTasks(token, tasks);
      dispatch(completedTasksAction.getCompletedTasks(tasks));
    } catch (err) {
      console.error('updateCompletedTasks error:', err);
    }
  };
};
