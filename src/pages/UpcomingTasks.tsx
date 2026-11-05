import React, { useMemo } from "react";
import TasksList from "../components/tasks/TasksList";
import { useViewTasks } from "../hooks/useQueries";
import { shortMonthFormat } from "../utils/dateFormatter";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Task } from "../types";

const UpcomingTasks: React.FC = () => {
  const { data: viewTasks, isLoading } = useViewTasks("upcoming");
  const reduxUpcoming = useSelector((state: RootState) => state.tasks.upcomingTasks);
  const todayStr = useMemo(() => shortMonthFormat(new Date()), []);

  let taskSections: any;
  let toggle: any = false;

  if (isLoading && !viewTasks) {
    taskSections = [{ title: "Upcoming Tasks", tasks: "Loading" }];
    toggle = "Loading";
  } else {
    const tasksList: Task[] = (viewTasks as Task[]) || [];
    const dates = [...new Set(tasksList.map((t) => t.date))].filter(
      (date): date is string => Boolean(date)
    );

    const sections = dates
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .map((date) => ({
        title: date === todayStr ? `Today (${date})` : date,
        tasks: tasksList.filter((task) => task.date === date),
      }));

    if (sections.length > 0) {
      taskSections = sections;
      toggle = sections;
    } else if (Array.isArray(reduxUpcoming) && reduxUpcoming.length > 0) {
      taskSections = reduxUpcoming;
      toggle = reduxUpcoming;
    } else {
      taskSections = [{ title: "Upcoming Tasks", tasks: [] }];
      toggle = false;
    }
  }

  return (
    <TasksList
      projectLink
      toggle={toggle}
      taskSections={taskSections}
    />
  );
};

export default UpcomingTasks;
