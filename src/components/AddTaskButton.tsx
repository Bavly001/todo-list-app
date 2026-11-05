import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../store/modal-slice";
import { HiOutlinePlusSm } from "react-icons/hi";
import { RootState } from "../store";
import { useModalParams } from "../hooks/useModalParams";

const AddTaskButton = () => {
  const dispatch = useDispatch();
  const { openModal } = useModalParams();
  const colorTheme = useSelector((state: RootState) => state.theme.color);

  const handleClick = () => {
    openModal("add-task");
    dispatch(modalActions.addTask());
  };

  return (
    <button
      className="flex justify-center items-center mt-5 opacity-100 transition-all mx-auto w-full"
      onClick={handleClick}
    >
      <HiOutlinePlusSm className={`${colorTheme.textColor}`} />
      <span>Add Task</span>
    </button>
  );
};

export default AddTaskButton;
