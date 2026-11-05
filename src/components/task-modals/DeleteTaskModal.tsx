import Modal from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import { tasksActions } from "../../store/tasks/tasks-slice";
import { modalActions } from "../../store/modal-slice";
import React from "react";
import { RootState } from "../../store";
import { useModalParams } from "../../hooks/useModalParams";
import { useDeleteTask } from "../../hooks/useQueries";

interface DeleteTaskModalProps {
  taskId?: string | null;
}

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({ taskId: propTaskId }) => {
  const dispatch = useDispatch();
  const { activeTaskId, closeModal } = useModalParams();
  const deleteTaskMutation = useDeleteTask();

  const currentTask = useSelector((state: RootState) => state.tasks.currentTask);
  const targetId = propTaskId || activeTaskId || currentTask?.id;

  const deleteTask = async (event: React.FormEvent) => {
    event.preventDefault();
    if (targetId) {
      try {
        await deleteTaskMutation.mutateAsync(targetId);
      } catch (err) {
        console.error("Failed to delete task via API:", err);
      }
      dispatch(tasksActions.deleteTask(targetId));
      dispatch(tasksActions.clearCurrentTask());
    }
    closeModal();
    dispatch(modalActions.close());
  };

  return (
    <Modal
      title="Delete Task ...?"
      buttonText="Delete"
      onSubmit={deleteTask}
    >
      <h2 className="font-bold">
        Are you sure you want to delete this Task?
      </h2>
      <p>
        It will be permanently deleted. You can NOT restore it anymore.
      </p>
    </Modal>
  );
};

export default DeleteTaskModal;
