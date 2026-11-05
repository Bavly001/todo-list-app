import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectActions } from "../../store/projects/project-slice";
import DropDownMenu from "../DropDownMenu";
import { RootState } from "../../store";

export interface ProjectListProps {
  project?: any;
  taskProject?: any;
  updateForm?: (updated: boolean) => void;
  handleProjectValue?: (val: any) => void;
  handleDateAndProjectValues?: (val: any) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({
  project,
  taskProject,
  updateForm,
  handleProjectValue,
  handleDateAndProjectValues,
}) => {
  const initialProject = project ?? taskProject;
  const onProjectChange = handleProjectValue || handleDateAndProjectValues;

  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const toggle = () => {
    setOpen((prev) => !prev);
  };

  const [currentProject, setCurrentProject] = useState<any>(initialProject);
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.projects.projects);
  const openedProject = useSelector(
    (state: RootState) => state.projects.currentProject
  );

  useEffect(() => {
    if (initialProject && typeof initialProject === "string" && (initialProject[0] === "P" || initialProject.startsWith("prj_"))) {
      dispatch(projectActions.getProjectById(initialProject));
      setCurrentProject(openedProject);
    }
  }, [dispatch, openedProject, initialProject]);

  useEffect(() => {
    if (updateForm) {
      if (JSON.stringify(initialProject) === JSON.stringify(currentProject))
        updateForm(false);
      else updateForm(true);
    }
  }, [currentProject, initialProject, updateForm]);

  useEffect(() => {
    if (onProjectChange && typeof currentProject !== "string") {
      onProjectChange(currentProject);
    }
  }, [currentProject, onProjectChange]);

  const buttonClassName = `w-full p-2 border-2 border-gray-300 dark:border-gray-700 text-gray-600 ${
    typeof currentProject === "object" &&
    currentProject !== null &&
    currentProject !== undefined
      ? "dark:text-gray-200"
      : "dark:text-gray-400"
  } rounded-lg
    hover:bg-gray-800 dark:hover:bg-gray-200 hover:text-gray-300 dark:hover:text-gray-700 dark:hover:border-gray-300 hover:border-gray-800`;

  const buttonContent = currentProject
    ? currentProject.projectTitle
    : "Project Name";

  return (
    <DropDownMenu
      buttonClassName={buttonClassName}
      buttonContent={buttonContent}
      open={open}
      toggle={toggle}
      onClose={onClose}
    >
      <div className="py-3 flex flex-col">
        {projects && projects.length > 0 && (
          <button
            type="button"
            onClick={() => {
              setCurrentProject(undefined);
              onClose();
            }}
            className="w-full py-2 px-2 hover:bg-gray-200 dark:hover:bg-gray-900"
          >
            None
          </button>
        )}
        {projects && projects.length > 0 ? (
          projects.map((proj) => (
            <button
              key={proj.projectId}
              type="button"
              onClick={() => {
                setCurrentProject({
                  projectId: proj.projectId,
                  projectTitle: proj.projectTitle,
                });
                onClose();
              }}
              className="w-full py-2 px-2 hover:bg-gray-200 dark:hover:bg-gray-900"
            >
              {proj.projectTitle}
            </button>
          ))
        ) : (
          <p className="w-full py-2 px-10 text-center">
            No projects yet.
          </p>
        )}
      </div>
    </DropDownMenu>
  );
};

export default ProjectList;
