import { tasksActions } from "./tasks-slice";
import { getUserToken } from "../../utils/userAuth";
import { tasksApi } from "../../api";
import { Task } from "../../types";

export const fetchTasksData = () => {
  return async (dispatch: any) => {
    const token = getUserToken();
    if (!token) return;

    dispatch(tasksActions.getTasks('Loading'));
    try {
      const data = await tasksApi.getTasks(token);
      dispatch(tasksActions.getTasks(data));
    } catch (err) {
      console.error('fetchTasksData error:', err);
      dispatch(tasksActions.getTasks([]));
    }
  };
};

export const updateTasks = (tasks: Task[] | null) => {
  return async (dispatch: any) => {
    const token = getUserToken();
    if (!token || !tasks) return;

    try {
      await tasksApi.updateTasks(token, tasks);
      dispatch(tasksActions.getTasks(tasks));
    } catch (err) {
      console.error('updateTasks error:', err);
    }
  };
};
