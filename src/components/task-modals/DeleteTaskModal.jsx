import Modal from "../Modal";
import { useDispatch, useSelector } from "react-redux";
import { tasksActions } from "../../store/tasks/tasks-slice";
import { modalActions } from "../../store/modal-slice";

const DeleteTaskModal = () => {
     const dispatch = useDispatch();
     const currentTask = useSelector((state) => state.tasks.currentTask);

     const deleteTask = (event) => {
          event.preventDefault();
          dispatch(tasksActions.deleteTask(currentTask.id));
          dispatch(tasksActions.clearCurrentTask());
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
                    It will be permanently deleted. You can NOT restore it
                    anymore.
               </p>
          </Modal>
     );
};

export default DeleteTaskModal;
