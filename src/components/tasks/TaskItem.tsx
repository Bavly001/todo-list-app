import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { tasksActions } from "../../store/tasks/tasks-slice";
import { modalActions } from "../../store/modal-slice";
import { completeTaskWithUndo } from "../../utils/taskCompletionManager";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import TicIcon from "./TicIcon";
import { RootState } from "../../store";
import { useModalParams } from "../../hooks/useModalParams";

export interface TaskItemProps {
  id: string;
  title: string;
  date?: string | null | false;
  description?: string;
  project?: any;
  circleButtonDisabled?: boolean;
  projectLink?: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  date,
  description,
  project,
  circleButtonDisabled = false,
  projectLink = false,
}) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { openTask, closeModal } = useModalParams();
  const [checked, setChecked] = useState(false);
  const buttonClasses = checked
    ? "border-gray-600 dark:border-gray-400 bg-gray-600 dark:bg-gray-400 flex items-center justify-center p-0"
    : "border-gray-400 dark:border-gray-600 delay-300";
  const lineThrough = checked ? "line-through" : "";

  const undoClicked = useSelector((state: RootState) => state.notification.undoClicked);

  const handleCheck = (event: React.MouseEvent) => {
    event.stopPropagation();
    setChecked(true);
    completeTaskWithUndo(
      {
        id,
        title,
        date: typeof date === "string" ? date : null,
        description,
        project,
      },
      dispatch,
      queryClient
    );
  };

  useEffect(() => {
    if (undoClicked) {
      setChecked(false);
    }
  }, [undoClicked]);

  const colorTheme = useSelector((state: RootState) => state.theme.color);
  const modal = useSelector((state: RootState) => state.modal.currentModal);

  return (
    <motion.div
      layout
      initial={{ x: 500 }}
      animate={{ x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ type: "tween" }}
      role="button"
      className="flex gap-2 w-[96%] float-end pb-2 pt-4 pe-2 border-b-2 border-gray-200 dark:border-gray-800"
      onClick={() => {
        if (!checked) {
          openTask(id);
          dispatch(tasksActions.getTaskById(id));
          dispatch(modalActions.editTask());
        }
      }}
    >
      <motion.button
        whileTap={{
          scale: !circleButtonDisabled ? 1.2 : 1,
        }}
        onClick={handleCheck}
        type="button"
        disabled={checked || circleButtonDisabled}
        className={`border-2 rounded-full shrink-0 flex-shrink-0 aspect-square w-4 h-4 sm:w-[18px] sm:h-[18px] md:w-5 md:h-5 min-w-[16px] min-h-[16px] max-w-[20px] max-h-[20px] mt-1 transition-all overflow-hidden flex items-center justify-center p-0 ${buttonClasses}`}
      >
        <AnimatePresence>
          {checked && <TicIcon />}
        </AnimatePresence>
      </motion.button>
      <div>
        <p className={`font-semibold ${lineThrough}`}>{title}</p>
        {description && description !== "" && (
          <p className={`text-xs text-gray-400 ${lineThrough}`}>
            {description}
          </p>
        )}
        {!projectLink && date && date !== "" && (
          <p className={`text-xs ${colorTheme.textColor} ${lineThrough}`}>
            {date}
          </p>
        )}
        {projectLink && project && (
          <p className="flex">
            <button
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                navigate("/app/projects/project/" + project.projectId);
                closeModal();
                if (modal) dispatch(modalActions.close());
              }}
              className={`text-xs ${colorTheme.textColor} hover:underline ${lineThrough}`}
            >
              {project.projectTitle}
            </button>
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default TaskItem;
