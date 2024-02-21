import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectActions } from "../../store/projects/project-slice";
import DropDownMenu from "../DropDownMenu";

const ProjectList = ({ project, updateForm, handleProjectValue }) => {
     const [open, setOpen] = useState(false);
     const onClose = () => {
          setOpen(false);
     };
     const toggle = () => {
          setOpen((prev) => !prev);
     };

     const [currentProject, setCurrentProject] = useState(project);
     const dispatch = useDispatch();
     const projects = useSelector((state) => state.projects.projects);
     const openedProject = useSelector(
          (state) => state.projects.currentProject
     );
     useEffect(() => {
          if (project && project[0] === "P") {
               dispatch(projectActions.getProjectById(project));
               setCurrentProject(openedProject);
          }
     }, [dispatch, openedProject, project]);

     useEffect(() => {
          if (updateForm) {
               if (JSON.stringify(project) === JSON.stringify(currentProject))
                    updateForm(false);
               else updateForm(true);
          }
     }, [currentProject, project, updateForm]);

     useEffect(() => {
          if (typeof currentProject !== "string")
               handleProjectValue(currentProject);
     }, [currentProject, handleProjectValue]);

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
                              className="w-full py-2 px-16 hover:bg-gray-200 dark:hover:bg-gray-900"
                         >
                              None
                         </button>
                    )}
                    {projects && projects.length > 0 ? (
                         projects.map((project) => (
                              <button
                                   key={project.projectId}
                                   type="button"
                                   onClick={() => {
                                        setCurrentProject({
                                             projectId: project.projectId,
                                             projectTitle: project.projectTitle,
                                        });
                                        onClose();
                                   }}
                                   className="w-full py-2 px-16 hover:bg-gray-200 dark:hover:bg-gray-900"
                              >
                                   {project.projectTitle}
                              </button>
                         ))
                    ) : (
                         <p type="button" className="w-full py-2 px-10">
                              No projects yet.
                         </p>
                    )}
               </div>
          </DropDownMenu>
     );
};

export default ProjectList;
