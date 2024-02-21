import { useSelector } from "react-redux";
import TasksList from "../components/tasks/TasksList";

const Tasks = () => {
     const tasks = useSelector((state) => state.tasks.nonProjectsTasks);
     return (
          <TasksList taskSections={[{ title: "Tasks", tasks }]} />
     );
};

export default Tasks;
