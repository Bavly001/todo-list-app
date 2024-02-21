import { useSelector } from "react-redux";
import TasksList from "../components/tasks/TasksList";

const Today = () => {
     const tasks = useSelector((state) => state.tasks.todayTasks);
     return (
          <TasksList projectLink taskSections={[{ title: "Today", tasks }]} />
     );
};

export default Today;
