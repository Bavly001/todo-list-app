import { tasksActions } from '../store/tasks/tasks-slice';
import { completedTasksAction } from '../store/completed-tasks/completed-tasks-slice';
import { notificationActions } from '../store/notification-slice';
import { shortMonthFormat } from './dateFormatter';
import { tasksApi, completedTasksApi } from '../api';
import { Task } from '../types';

interface PendingTaskCompletion {
  task: Task;
  timeoutId: ReturnType<typeof setTimeout>;
}

const pendingCompletions = new Map<string, PendingTaskCompletion>();

/**
 * Initiates the complete task flow with undo capability.
 * Optimistically removes the task from the view, displays the notification bar
 * with the Undo button, and after 4 seconds commits the completion to the backend.
 */
export const completeTaskWithUndo = (
  task: Task,
  dispatch: any,
  queryClient?: any
) => {
  if (!task || !task.id) return;

  // Clear any existing timer for this specific task
  if (pendingCompletions.has(task.id)) {
    clearTimeout(pendingCompletions.get(task.id)!.timeoutId);
    pendingCompletions.delete(task.id);
  }

  // Optimistically remove from active tasks in Redux
  dispatch(tasksActions.deleteTask(task.id));

  // Display notification bar with Undo button
  dispatch(
    notificationActions.showNotification({
      title: `${task.title} task is completed.`,
      undo: true,
    })
  );

  // Schedule final commit after 4 seconds
  const timeoutId = setTimeout(async () => {
    pendingCompletions.delete(task.id);

    const completedTask = {
      id: task.id,
      title: task.title,
      description: task.description || '',
      date: task.date || null,
      completionDate: shortMonthFormat(new Date()),
      project: task.project || null,
    };

    dispatch(completedTasksAction.addCompletedTasks(completedTask));

    try {
      await completedTasksApi.createCompletedTask(completedTask);
      await tasksApi.deleteTask(task.id);
    } catch (err) {
      console.error('Failed to commit completed task to API:', err);
    }

    if (queryClient) {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task-counts'] });
      queryClient.invalidateQueries({ queryKey: ['completedTasks'] });
    }
  }, 4000);

  pendingCompletions.set(task.id, { task, timeoutId });
};

/**
 * Cancels all pending task completions and restores tasks back to active state.
 */
export const undoPendingCompletions = (dispatch: any) => {
  pendingCompletions.forEach(({ task, timeoutId }) => {
    clearTimeout(timeoutId);
    dispatch(tasksActions.addTask(task));
  });
  pendingCompletions.clear();
};
