import React from "react";
import TasksList from "../components/tasks/TasksList";
import { useViewTasks } from "../hooks/useQueries";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Tasks: React.FC = () => {
  const { data: viewTasks, isLoading } = useViewTasks("inbox");
  const reduxTasks = useSelector((state: RootState) => state.tasks.nonProjectsTasks);

  const tasks =
    isLoading && !viewTasks
      ? "Loading"
      : (viewTasks || reduxTasks || []);

  return (
    <TasksList taskSections={[{ title: "Tasks", tasks }]} />
  );
};

export default Tasks;
