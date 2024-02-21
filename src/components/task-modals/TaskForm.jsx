import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal";
import DatePickerComponent from "./DatePickerComponent";
import ProjectList from "./ProjectList";
import { tasksActions } from "../../store/tasks/tasks-slice";
import { shortMonthFormat } from "../../utils/dateFormatter";
import { useLocation, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useCallback, useState } from "react";
import { modalActions } from "../../store/modal-slice";
import { notificationActions } from "../../store/notification-slice";

const AddTaskForm = ({ title }) => {
     const dispatch = useDispatch();
     const task = useSelector((state) => state.tasks.currentTask);
     const [submitBtn, setSubmitBtn] = useState(false);
     const colorTheme = useSelector((state) => state.theme.color);
     const { projectId } = useParams();
     const { pathname } = useLocation();

     const initialValues = task ?? { title: "", description: "" };

     const [dateAndProjectValue, setDateAndProjectValue] = useState({});
     const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
          useFormik({
               initialValues,
               validationSchema: yup.object().shape({
                    title: yup
                         .string()
                         .min(3, "Please, Enter a valid task name")
                         .required("At least, Add task title."),
               }),
               onSubmit: (values) => {
                    if (task) {
                         dispatch(
                              tasksActions.updateTask({
                                   id: task.id,
                                   title: values.title,
                                   description: values?.description,
                                   date: dateAndProjectValue?.date?.startDate
                                        ? shortMonthFormat(
                                               new Date(
                                                    dateAndProjectValue?.date?.startDate
                                               )
                                          )
                                        : null,
                                   project: dateAndProjectValue?.projectId
                                        ? {
                                               projectTitle:
                                                    dateAndProjectValue.projectTitle,
                                               projectId:
                                                    dateAndProjectValue.projectId,
                                          }
                                        : null,
                              })
                         );
                         dispatch(tasksActions.clearCurrentTask());
                         dispatch(
                              notificationActions.showNotification({
                                   title: `${values.title} task is edited successfully.`,
                              })
                         );
                    } else {
                         dispatch(
                              tasksActions.addTask({
                                   id: `T${String(new Date()).replaceAll(
                                        " ",
                                        ""
                                   )}`,
                                   title: values.title,
                                   description: values?.description,
                                   date: dateAndProjectValue?.date?.startDate
                                        ? shortMonthFormat(
                                               new Date(
                                                    dateAndProjectValue?.date?.startDate
                                               )
                                          )
                                        : null,
                                   project: dateAndProjectValue?.projectId
                                        ? {
                                               projectTitle:
                                                    dateAndProjectValue.projectTitle,
                                               projectId:
                                                    dateAndProjectValue.projectId,
                                          }
                                        : null,
                              })
                         );
                         dispatch(
                              notificationActions.showNotification({
                                   title: `${values.title} task is added successfully.`,
                              })
                         );
                    }
                    dispatch(modalActions.close());
               },
          });

     const updateForm = useCallback((data) => setSubmitBtn(data), []);
     const handleDateAndProjectValues = useCallback((data) => {
          if (data === undefined)
               setDateAndProjectValue((prev) => ({
                    ...prev,
                    projectTitle: null,
                    projectId: null,
               }));
          setDateAndProjectValue((prev) => ({ ...prev, ...data }));
     }, []);

     const onChange = (event) => {
          handleChange(event);
          if (task)
               task[event.target.name] === event.target.value
                    ? setSubmitBtn(false)
                    : setSubmitBtn(true);
     };

     const onClose = () => {
          task &&
               setTimeout(() => {
                    dispatch(tasksActions.clearCurrentTask());
               }, 500);
     };

     return (
          <Modal
               title={title}
               onSubmit={handleSubmit}
               cancelButton={task && "Delete"}
               submitButton={!task || submitBtn}
               onClose={task && onClose}
               buttonText={task && "Update"}
               deleteButton={task}
               deleteFn={() => {
                    dispatch(modalActions.deleteTask());
               }}
          >
               <input
                    type="text"
                    className="bg-transparent text-xl w-full focus:outline-none"
                    autoFocus={!task}
                    placeholder="Task Title"
                    name="title"
                    value={values.title}
                    onChange={onChange}
                    onBlur={handleBlur}
                    autoComplete="off"
               />
               {errors.title && touched.title && (
                    <small className={`-mt-2 ${colorTheme.textColor}`}>
                         {errors.title}
                    </small>
               )}
               <input
                    type="text"
                    className="bg-transparent w-full focus:outline-none"
                    placeholder="Description"
                    name="description"
                    value={values.description}
                    onChange={onChange}
                    autoComplete="off"
               />
               <div className="flex gap-4 flex-col-reverse sm:flex-col-reverse md:flex-row lg:flex-row">
                    <DatePickerComponent
                         date={
                              task
                                   ? task.date
                                   : pathname.includes("today")
                                   ? shortMonthFormat(new Date())
                                   : null
                         }
                         updateForm={task && updateForm}
                         handleDateValue={handleDateAndProjectValues}
                    />

                    <ProjectList
                         project={task ? task.project : projectId ?? null}
                         updateForm={task && updateForm}
                         handleProjectValue={handleDateAndProjectValues}
                    />
               </div>
          </Modal>
     );
};

export default AddTaskForm;
