import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal";
import { projectActions } from "../../store/projects/project-slice";
import { useFormik } from "formik";
import * as yup from "yup";
import { modalActions } from "../../store/modal-slice";
import { notificationActions } from "../../store/notification-slice";
import React from "react";
import { RootState } from "../../store";
import { useModalParams } from "../../hooks/useModalParams";

const AddProjectForm: React.FC = () => {
  const dispatch = useDispatch();
  const { closeModal } = useModalParams();
  const colorTheme = useSelector((state: RootState) => state.theme.color);

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: { title: "" },
      validationSchema: yup.object().shape({
        title: yup
          .string()
          .min(3, "Please, Enter a valid project name")
          .required("At least, Add project title."),
      }),
      onSubmit: (formValues) => {
        const randomPart = Math.random().toString(36).substring(2, 12);
        const generatedId = `prj_${Date.now().toString(36)}${randomPart}`;

        dispatch(
          projectActions.addProject({
            projectId: generatedId,
            projectTitle: formValues.title,
          })
        );
        closeModal();
        dispatch(modalActions.close());
        dispatch(
          notificationActions.showNotification({
            title: `${formValues.title} project is added successfully.`,
          })
        );
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
        className="w-full bg-transparent text-xl font-semibold px-3 py-2 rounded-lg border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 focus:bg-white dark:focus:bg-gray-800/50 transition-all duration-150"
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
