import { useSelector } from "react-redux";
import TasksList from "../components/tasks/TasksList";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Project = () => {
     const { projectId } = useParams();

     const projects = useSelector((state) => state.projects.projects);
     const currentProject =
          projects &&
          projects !== "Loading" &&
          projects.find((project) => project.projectId === projectId);

     const tasksList = useSelector((state) => state.tasks.tasks);
     const tasks =
          tasksList && tasksList !== "Loading"
               ? tasksList.filter(
                      (task) => task.project?.projectId === projectId
                 )
               : tasksList;

     useEffect(() => {
          document.title = `Doit | ${currentProject?.projectTitle} Project`;
     }, [currentProject]);
     return (
          <TasksList
               taskSections={[{ title: currentProject?.projectTitle, tasks }]}
          />
     );
};

export default Project;
