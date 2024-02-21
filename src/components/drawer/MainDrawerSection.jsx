import { BsFillPlusCircleFill } from "react-icons/bs";
import DrawerListButton from "./DrawerListButtons";
import { IoSearch } from "react-icons/io5";
import { GoTasklist } from "react-icons/go";
import { MdToday } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { modalActions } from "../../store/modal-slice";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

const MainDrawerSection = () => {
     const dispatch = useDispatch();
     const colorTheme = useSelector((state) => state.theme.color);
     const allTasks = useSelector((state) => state.tasks.tasks);
     const todayTasks = useSelector((state) => state.tasks.todayTasks);
     const tasks = useSelector((state) => state.tasks.nonProjectsTasks);

     return (
          <motion.div
               
               className="w-full"
          >
               <DrawerListButton
                    title="Add Task"
                    Icon={BsFillPlusCircleFill}
                    className={`font-bold ${colorTheme.textColor}`}
                    Component="button"
                    onClick={() => dispatch(modalActions.addTask())}
               />
               <DrawerListButton
                    title="Search"
                    Icon={IoSearch}
                    Component="button"
                    onClick={() => dispatch(modalActions.search())}
               />
               <DrawerListButton
                    title="Today"
                    Icon={MdToday}
                    tasksNumber={
                         todayTasks &&
                         todayTasks !== "Loading" &&
                         todayTasks.length
                    }
                    to="today"
               />
               <DrawerListButton
                    title="Upcoming"
                    Icon={FaRegCalendarAlt}
                    tasksNumber={
                         allTasks &&
                         allTasks !== "Loading" &&
                         allTasks.filter((task) => task.date).length
                    }
                    iconClassName="text-lg"
                    to="upcoming"
               />
               <DrawerListButton
                    title="Tasks"
                    Icon={GoTasklist}
                    tasksNumber={tasks && tasks !== "Loading" && tasks.length}
                    to="tasks"
               />
          </motion.div>
     );
};

export default MainDrawerSection;
