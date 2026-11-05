import { LiaSlackHash } from "react-icons/lia";
import DrawerListButton from "./DrawerListButtons";
import { HiOutlinePlusSm } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/modal-slice";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { RootState } from "../../store";
import { useModalParams } from "../../hooks/useModalParams";
import { useTaskCounts } from "../../hooks/useQueries";
import { shortMonthFormat } from "../../utils/dateFormatter";
import React from "react";

const ProjectsSection: React.FC = () => {
  const dispatch = useDispatch();
  const { openModal } = useModalParams();
  const projectList = useSelector((state: RootState) => state.projects.projects);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const { projectId } = useParams();

  const todayStr = React.useMemo(() => shortMonthFormat(new Date()), []);
  const { data: counts } = useTaskCounts(todayStr);

  const startAddingProject = () => {
    openModal("add-project");
    dispatch(modalActions.addProject());
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  let content: React.ReactNode = null;
  if (Array.isArray(projectList)) {
    content =
      projectList.length === 0 ? (
        <p
          className="text-gray-400 dark:text-gray-600 text-xs text-center cursor-pointer mt-2"
          onClick={startAddingProject}
        >
          Start Adding Projects.
        </p>
      ) : (
        <AnimatePresence>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            {projectList.map((project) => {
              const projectCount =
                counts?.projects?.[project.projectId] ??
                (Array.isArray(tasks)
                  ? tasks.filter((task) => task.project?.projectId === project.projectId).length
                  : 0);

              const deleteProject = () => {
                openModal("delete-project", { projectId: project.projectId });
                dispatch(modalActions.deleteProject());
              };

              return (
                <DrawerListButton
                  key={project.projectId}
                  deleteBtn={projectId === project.projectId}
                  deleteProject={deleteProject}
                  title={project.projectTitle}
                  Icon={LiaSlackHash}
                  tasksNumber={projectCount}
                  to={`projects/project/${project.projectId}`}
                />
              );
            })}
          </motion.div>
        </AnimatePresence>
      );
  }

  return (
    <>
      <div className="w-full flex justify-between items-center text-gray-600 dark:text-gray-400 px-1">
        <h1 className="ms-5 font-bold text-sm">Projects</h1>
        {Array.isArray(projectList) && projectList.length === 4 ? (
          <small className="font-bold">4/4</small>
        ) : (
          <button onClick={startAddingProject}>
            <HiOutlinePlusSm />
          </button>
        )}
      </div>

      <div className="w-full gap-3">{content}</div>
    </>
  );
};

export default ProjectsSection;
