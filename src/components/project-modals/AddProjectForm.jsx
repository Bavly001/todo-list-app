import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal";
import { projectActions } from "../../store/projects/project-slice";
import { useFormik } from "formik";
import * as yup from "yup";
import { modalActions } from "../../store/modal-slice";
import { notificationActions } from "../../store/notification-slice";

const AddProjectForm = () => {
     const dispatch = useDispatch();
     const colorTheme = useSelector((state) => state.theme.color);

     const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
          useFormik({
               initialValues: { title: "" },
               validationSchema: yup.object().shape({
                    title: yup
                         .string()
                         .min(3, "Please, Enter a valid project name")
                         .required("At least, Add project title."),
               }),
               onSubmit: (values) => {
                    dispatch(
                         projectActions.addProject({
                              projectId: `P${String(new Date()).replaceAll(
                                   " ",
                                   ""
                              )}`,
                              projectTitle: values.title,
                         })
                    );
                    dispatch(modalActions.close());
                    dispatch(notificationActions.showNotification({title:`${values.title} project is added successfully.`}))
               },
          });

     return (
          <Modal title="Add Project" onSubmit={handleSubmit}>
               <input
                    name="title"
                    value={values.title}
                    autoFocus
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    className="bg-transparent text-xl w-full focus:outline-none"
                    placeholder="Project Name"
                    autoComplete="off"
               />
               {errors.title && touched.title && (
                    <small className={`-mt-2 ${colorTheme.textColor}`}>
                         {errors.title}
                    </small>
               )}
          </Modal>
     );
};

export default AddProjectForm;
