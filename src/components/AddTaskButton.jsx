import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../store/modal-slice";
import { HiOutlinePlusSm } from "react-icons/hi";

const AddTaskButton = () => {
     const dispatch = useDispatch();
     const colorTheme = useSelector((state) => state.theme.color);

     return (
          <button
               className="flex justify-center items-center mt-5 opacity-100 transition-all mx-auto w-full"
               onClick={() => dispatch(modalActions.addTask())}
          >
               <HiOutlinePlusSm className={`${colorTheme.textColor}`} />
               <span>Add Task</span>
          </button>
     );
};

export default AddTaskButton;
