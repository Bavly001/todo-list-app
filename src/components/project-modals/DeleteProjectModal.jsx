import { useNavigate, useParams } from "react-router-dom";
import Modal from "../Modal";
import { useDispatch } from "react-redux";
import { tasksActions } from "../../store/tasks/tasks-slice";
import { projectActions } from "../../store/projects/project-slice";
import { modalActions } from "../../store/modal-slice";

const DeleteProjectModal = () => {
     const { projectId } = useParams();
     const navigate = useNavigate();
     const dispatch = useDispatch();

     const deleteProject = (event) => {
          event.preventDefault();
          dispatch(tasksActions.deleteTasksByProjectId(projectId));
          dispatch(projectActions.deleteProject(projectId));
          navigate("/app/today");
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
