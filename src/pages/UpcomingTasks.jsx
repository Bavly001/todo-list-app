import { useSelector } from "react-redux";
import TasksList from "../components/tasks/TasksList";

const UpcomingTasks = () => {
     const tasks = useSelector((state) => state.tasks.upcomingTasks);
     return (
          <TasksList
               projectLink
               toggle={tasks}
               taskSections={
                    tasks === "Loading"
                         ? [{ title: "Upcoming Tasks", tasks: "Loading" }]
                         : tasks?.length > 0
                         ? tasks
                         : [{ title: "Upcoming Tasks", tasks: [] }]
               }
          />
     );
};

export default UpcomingTasks;
