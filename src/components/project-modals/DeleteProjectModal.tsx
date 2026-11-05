import { useNavigate, useParams } from "react-router-dom";
import Modal from "../Modal";
import { useDispatch } from "react-redux";
import { tasksActions } from "../../store/tasks/tasks-slice";
import { projectActions } from "../../store/projects/project-slice";
import { modalActions } from "../../store/modal-slice";
import React from "react";
import { useModalParams } from "../../hooks/useModalParams";

interface DeleteProjectModalProps {
  projectId?: string | null;
}

const DeleteProjectModal: React.FC<DeleteProjectModalProps> = ({ projectId: propProjectId }) => {
  const { projectId: routeProjectId } = useParams();
  const { activeProjectId, closeModal } = useModalParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const targetProjectId = propProjectId || activeProjectId || routeProjectId;

  const deleteProject = (event: React.FormEvent) => {
    event.preventDefault();
    if (targetProjectId) {
      dispatch(tasksActions.deleteTasksByProjectId(targetProjectId));
      dispatch(projectActions.deleteProject(targetProjectId));
    }
    navigate("/app/today");
    closeModal();
    dispatch(modalActions.close());
  };

  return (
    <Modal
      title="Delete Project ...?"
      buttonText="Delete"
      onSubmit={deleteProject}
    >
      <h2 className="font-bold">
        Are you sure you want to delete this project?
      </h2>
      <p>All tasks in this project will be also deleted. </p>
    </Modal>
  );
};

export default DeleteProjectModal;
