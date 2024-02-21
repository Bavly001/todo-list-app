import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { tasksActions } from "../../store/tasks/tasks-slice";
import { modalActions } from "../../store/modal-slice";
import { completedTasksAction } from "../../store/completed-tasks/completed-tasks-slice";
import { shortMonthFormat } from "../../utils/dateFormatter";
import { notificationActions } from "../../store/notification-slice";
import { AnimatePresence, motion } from "framer-motion";
import TicIcon from "./TicIcon";

const TaskItem = ({
     id,
     title,
     date,
     description,
     project,
     circleButtonDisabled = false,
     projectLink = false,
}) => {
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const [checked, setChecked] = useState(false);
     const buttonClasses = checked
          ? "border-gray-600 dark:border-gray-400 bg-gray-600 dark:bg-gray-400 flex items-center justify-center"
          : "border-gray-400 dark:border-gray-600 delay-300";
     const lineThrough = checked ? "line-through" : "";

     const undoClicked = useSelector((state) => state.notification.undoClicked);

     const removeTask = useRef();

     const handleCheck = (event) => {
          event.stopPropagation();
          setChecked(true);
          dispatch(
               notificationActions.showNotification({
                    title: `${title} task is completed.`,
                    undo: true,
               })
          );

          removeTask.target = setTimeout(() => {
               dispatch(
                    completedTasksAction.addCompletedTasks({
                         id,
                         title,
                         date,
                         description,
                         project,
                         completionDate: shortMonthFormat(new Date()),
                    })
               );
               dispatch(tasksActions.deleteTask(id));
          }, 4000);
     };

     useEffect(() => {
          if (undoClicked) {
               setChecked(false);
               clearTimeout(removeTask.target);
          }
     }, [undoClicked]);

     const colorTheme = useSelector((state) => state.theme.color);
     const modal = useSelector((state) => state.modal.currentModal);

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
                         dispatch(tasksActions.getTaskById(id));
                         dispatch(modalActions.editTask());
                    } else return;
               }}
          >
               <motion.button
                    whileTap={{
                         scale: !circleButtonDisabled && 1.2,
                    }}
                    onClick={handleCheck}
                    type="button"
                    disabled={checked || circleButtonDisabled}
                    className={`border-2 rounded-full h-[16px] w-[16px] sm:h-[16px] sm:w-[16px] md:h-[18px] md:w-[18px] lg:h-[20px] lg:w-[20px] mt-1 transition-all ${buttonClasses}`}
               >
                    <AnimatePresence>
                         {checked && (
                              // <TiTick className="mb-px ms-px text-gray-100 dark:text-gray-900" />
                              <TicIcon />
                         )}
                    </AnimatePresence>
               </motion.button>
               <div>
                    <p className={`font-semibold ${lineThrough}`}>
                         {title}
                    </p>
                    {description && description !== "" && (
                         <p className={`text-xs text-gray-400 ${lineThrough}`}>
                              {description}
                         </p>
                    )}
                    {!projectLink && date && date !== "" && (
                         <p
                              className={`text-xs ${colorTheme.textColor} ${lineThrough}`}
                         >
                              {date}
                         </p>
                    )}
                    {projectLink && project && project !== "" && (
                         <p className="flex">
                              <button
                                   onClick={(event) => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        navigate(
                                             "/app/projects/project/" +
                                                  project.projectId
                                        );
                                        if (modal)
                                             dispatch(modalActions.close());
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
