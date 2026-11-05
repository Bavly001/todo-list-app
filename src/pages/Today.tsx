import React, { useMemo } from "react";
import TasksList from "../components/tasks/TasksList";
import { useViewTasks } from "../hooks/useQueries";
import { shortMonthFormat } from "../utils/dateFormatter";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Today: React.FC = () => {
  const todayStr = useMemo(() => shortMonthFormat(new Date()), []);
  const { data: viewTasks, isLoading } = useViewTasks("today", { date: todayStr });
  const reduxTodayTasks = useSelector((state: RootState) => state.tasks.todayTasks);

  const tasks =
    isLoading && !viewTasks
      ? "Loading"
      : (viewTasks || reduxTodayTasks || []);

  return (
    <TasksList projectLink taskSections={[{ title: "Today", tasks }]} />
  );
};

export default Today;
