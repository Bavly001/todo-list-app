import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal";
import DatePickerComponent from "./DatePickerComponent";
import ProjectList from "./ProjectList";
import { tasksActions } from "../../store/tasks/tasks-slice";
import { shortMonthFormat } from "../../utils/dateFormatter";
import { useFormik } from "formik";
import * as yup from "yup";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { modalActions } from "../../store/modal-slice";
import { notificationActions } from "../../store/notification-slice";
import { RootState } from "../../store";
import { useModalParams } from "../../hooks/useModalParams";
import {
  useTaskDetails,
  useCreateTask,
  useUpdateTask,
} from "../../hooks/useQueries";
import { useQueryClient } from "@tanstack/react-query";
import { completeTaskWithUndo } from "../../utils/taskCompletionManager";
import { Task } from "../../types";

export interface TaskFormProps {
  title: string;
  taskId?: string | null;
}

interface DateAndProjectValue {
  date?: {
    startDate?: string | Date | null;
  } | null;
  projectId?: string | null;
  projectTitle?: string | null;
}

const AddTaskFormInner: React.FC<{
  title: string;
  task: Task | null;
  isLoading?: boolean;
  onClose?: () => void;
}> = ({ title, task, isLoading = false }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { closeModal, openModal } = useModalParams();
  const [submitBtn, setSubmitBtn] = useState(false);
  const colorTheme = useSelector((state: RootState) => state.theme.color);

  const [titleActive, setTitleActive] = useState(false);
  const [descActive, setDescActive] = useState(false);

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();

  const initialValues = task ?? { title: "", description: "" };

  const [dateAndProjectValue, setDateAndProjectValue] =
    useState<DateAndProjectValue>({
      date: task?.date ? { startDate: task.date } : null,
      projectId: task?.project?.projectId || null,
      projectTitle: task?.project?.projectTitle || null,
    });

  useEffect(() => {
    if (task) {
      setDateAndProjectValue({
        date: task.date ? { startDate: task.date } : null,
        projectId: task.project?.projectId || null,
        projectTitle: task.project?.projectTitle || null,
      });
    }
  }, [task]);

  const adjustHeight = (el: HTMLTextAreaElement | null) => {
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      validationSchema: yup.object().shape({
        title: yup
          .string()
          .min(3, "Please, Enter a valid task name")
          .required("At least, Add task title."),
      }),
      onSubmit: async (formValues) => {
        const finalDate = dateAndProjectValue?.date?.startDate
          ? shortMonthFormat(new Date(dateAndProjectValue.date.startDate))
          : null;

        const finalProject = dateAndProjectValue?.projectId
          ? {
              projectTitle: dateAndProjectValue.projectTitle || "",
              projectId: dateAndProjectValue.projectId,
            }
          : null;

        if (task) {
          const updatedTaskData: Partial<Task> = {
            title: formValues.title,
            description: formValues.description,
            date: finalDate,
            project: finalProject,
          };

          await updateTaskMutation.mutateAsync({
            id: task.id,
            task: updatedTaskData,
          });
          dispatch(
            tasksActions.updateTask({
              id: task.id,
              title: formValues.title,
              description: formValues.description,
              date: finalDate,
              project: finalProject,
            }),
          );
          dispatch(
            notificationActions.showNotification({
              title: `${formValues.title} task is edited successfully.`,
            }),
          );
        } else {
          const created = await createTaskMutation.mutateAsync({
            title: formValues.title,
            description: formValues.description,
            date: finalDate,
            project: finalProject,
          });

          dispatch(
            tasksActions.addTask({
              id: created.id,
              title: formValues.title,
              description: formValues.description,
              date: finalDate,
              project: finalProject,
            }),
          );
          dispatch(
            notificationActions.showNotification({
              title: `${formValues.title} task is added successfully.`,
            }),
          );
        }

        closeModal();
        dispatch(modalActions.close());
      },
    });

  useEffect(() => {
    if (!isLoading) {
      requestAnimationFrame(() => {
        adjustHeight(titleRef.current);
        adjustHeight(descRef.current);
      });
    }
  }, [isLoading, values.title, values.description]);

  const updateForm = useCallback((data: boolean) => setSubmitBtn(data), []);

  const handleDateAndProjectValues = useCallback((data: any) => {
    if (data === undefined) {
      setDateAndProjectValue((prev) => ({
        ...prev,
        projectTitle: null,
        projectId: null,
      }));
    } else {
      setDateAndProjectValue((prev) => ({ ...prev, ...data }));
    }
  }, []);

  const isTitleChanged = task ? values.title !== (task.title || "") : false;
  const isDescChanged = task
    ? values.description !== (task.description || "")
    : false;
  const initialTaskDate = task?.date || null;
  const currentFormDate = dateAndProjectValue?.date?.startDate
    ? shortMonthFormat(new Date(dateAndProjectValue.date.startDate))
    : null;
  const isDateChanged = task ? currentFormDate !== initialTaskDate : false;
  const initialProjectId = task?.project?.projectId || null;
  const currentProjectId = dateAndProjectValue?.projectId || null;
  const isProjectChanged = task ? currentProjectId !== initialProjectId : false;

  const isFormDirty =
    isTitleChanged ||
    isDescChanged ||
    isDateChanged ||
    isProjectChanged ||
    submitBtn;
  const isEditing = Boolean(task) && isFormDirty;

  const handleComplete = () => {
    if (task) {
      closeModal();
      dispatch(modalActions.close());
      completeTaskWithUndo(task, dispatch, queryClient);
    }
  };

  return (
    <Modal
      title={title}
      onSubmit={handleSubmit}
      cancelButtonText="Close"
      submitButton={!isLoading && (!task || isEditing)}
      buttonText={task ? "Update" : "Add"}
      deleteButton={!isLoading && Boolean(task)}
      deleteFn={() => {
        if (task) {
          openModal("delete-task", { taskId: task.id });
        }
        dispatch(modalActions.deleteTask());
      }}
      completeButton={!isLoading && Boolean(task) && !isEditing}
      onComplete={handleComplete}
    >
      {isLoading ? (
        <div className="flex flex-col gap-4 py-1 animate-pulse">
          {/* Title skeleton */}
          <div className="h-10 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-lg" />
          {/* Description skeleton */}
          <div className="space-y-2.5 py-1">
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded-md" />
            <div className="h-4 w-11/12 bg-gray-200 dark:bg-gray-800 rounded-md" />
            <div className="h-4 w-3/5 bg-gray-200 dark:bg-gray-800 rounded-md" />
          </div>
          {/* Date and Project pills skeleton */}
          <div className="flex gap-2 pt-1">
            <div className="h-10 w-36 bg-gray-200 dark:bg-gray-800 rounded-lg" />
            <div className="h-10 w-36 bg-gray-200 dark:bg-gray-800 rounded-lg" />
          </div>
        </div>
      ) : (
        <>
          <textarea
            ref={titleRef}
            rows={1}
            className={`w-full max-w-full bg-transparent text-xl font-semibold resize-none scrollbar-hide ${
              titleActive ? "overflow-y-auto max-h-32" : "overflow-hidden"
            } leading-snug px-3 py-2 rounded-lg border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 focus:bg-white dark:focus:bg-gray-800/50 transition-all duration-150 break-words`}
            autoFocus={!task}
            placeholder="Task Title"
            name="title"
            value={values.title}
            onFocus={() => setTitleActive(true)}
            onBlur={(e) => {
              handleBlur(e);
              setTitleActive(false);
              adjustHeight(e.target);
            }}
            onChange={(e) => {
              handleChange(e);
              setSubmitBtn(true);
              adjustHeight(e.target);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          {errors.title && touched.title && (
            <small className={`-mt-2 ${colorTheme.textColor}`}>
              {errors.title}
            </small>
          )}
          <textarea
            ref={descRef}
            rows={1}
            className={`w-full max-w-full bg-transparent text-sm resize-none scrollbar-hide ${
              descActive ? "overflow-y-auto max-h-60" : "overflow-hidden"
            } leading-relaxed text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 focus:bg-white dark:focus:bg-gray-800/50 transition-all duration-150 break-words`}
            placeholder="Description"
            name="description"
            value={values.description}
            onFocus={() => setDescActive(true)}
            onBlur={(e) => {
              handleBlur(e);
              setDescActive(false);
              adjustHeight(e.target);
            }}
            onChange={(e) => {
              handleChange(e);
              setSubmitBtn(true);
              adjustHeight(e.target);
            }}
          />
          <div className="flex gap-2 pt-1 relative z-30">
            <DatePickerComponent
              updateForm={updateForm}
              taskDate={task ? task.date : undefined}
              handleDateAndProjectValues={handleDateAndProjectValues}
            />
            <ProjectList
              updateForm={updateForm}
              taskProject={task ? task.project : undefined}
              handleDateAndProjectValues={handleDateAndProjectValues}
            />
          </div>
        </>
      )}
    </Modal>
  );
};

const AddTaskForm: React.FC<TaskFormProps> = ({
  title,
  taskId: propTaskId,
}) => {
  const { activeTaskId } = useModalParams();
  const effectiveTaskId = propTaskId || activeTaskId;

  const reduxTask = useSelector((state: RootState) => state.tasks.currentTask);
  const { data: fetchedTask, isLoading: taskLoading } =
    useTaskDetails(effectiveTaskId);

  const task =
    fetchedTask ||
    (effectiveTaskId && reduxTask?.id === effectiveTaskId ? reduxTask : null);
  const isLoading = Boolean(effectiveTaskId && taskLoading && !task);

  return (
    <AddTaskFormInner
      key={effectiveTaskId || "new-task"}
      title={title}
      task={task}
      isLoading={isLoading}
    />
  );
};

export default AddTaskForm;
