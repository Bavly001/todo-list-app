import React, { useEffect } from "react";
import TasksList from "../components/tasks/TasksList";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useViewTasks } from "../hooks/useQueries";

const Project: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();

  const projects = useSelector((state: RootState) => state.projects.projects);
  const currentProject = Array.isArray(projects)
    ? projects.find((project) => project.projectId === projectId)
    : null;

  const { data: viewTasks, isLoading } = useViewTasks("project", { projectId });
  const tasksList = useSelector((state: RootState) => state.tasks.tasks);
  const fallbackTasks = Array.isArray(tasksList)
    ? tasksList.filter((task) => task.project?.projectId === projectId)
    : null;

  const tasks =
    isLoading && !viewTasks
      ? "Loading"
      : (viewTasks || fallbackTasks || []);

  useEffect(() => {
    document.title = `Doit | ${currentProject?.projectTitle || ""} Project`;
  }, [currentProject]);

  return (
    <TasksList
      taskSections={[{ title: currentProject?.projectTitle || "", tasks }]}
    />
  );
};

export default Project;
