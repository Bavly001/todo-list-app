import { BsFillPlusCircleFill } from "react-icons/bs";
import DrawerListButton from "./DrawerListButtons";
import { IoSearch } from "react-icons/io5";
import { GoTasklist } from "react-icons/go";
import { MdToday } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { modalActions } from "../../store/modal-slice";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { RootState } from "../../store";
import { useModalParams } from "../../hooks/useModalParams";
import { useTaskCounts } from "../../hooks/useQueries";
import { shortMonthFormat } from "../../utils/dateFormatter";
import React from "react";

const MainDrawerSection: React.FC = () => {
  const dispatch = useDispatch();
  const { openModal } = useModalParams();
  const colorTheme = useSelector((state: RootState) => state.theme.color);

  const todayStr = React.useMemo(() => shortMonthFormat(new Date()), []);
  const { data: counts } = useTaskCounts(todayStr);

  const allTasks = useSelector((state: RootState) => state.tasks.tasks);
  const todayTasks = useSelector((state: RootState) => state.tasks.todayTasks);
  const tasks = useSelector((state: RootState) => state.tasks.nonProjectsTasks);

  const todayCount = counts?.today ?? (Array.isArray(todayTasks) ? todayTasks.length : "");
  const upcomingCount = counts?.upcoming ?? (Array.isArray(allTasks) ? allTasks.filter((t) => t.date).length : "");
  const inboxCount = counts?.inbox ?? (Array.isArray(tasks) ? tasks.length : "");

  return (
    <motion.div className="w-full">
      <DrawerListButton
        title="Add Task"
        Icon={BsFillPlusCircleFill}
        className={`font-bold ${colorTheme.textColor}`}
        Component="button"
        onClick={() => {
          openModal("add-task");
          dispatch(modalActions.addTask());
        }}
      />
      <DrawerListButton
        title="Search"
        Icon={IoSearch}
        Component="button"
        onClick={() => {
          openModal("search");
          dispatch(modalActions.search());
        }}
      />
      <DrawerListButton
        title="Today"
        Icon={MdToday}
        tasksNumber={todayCount}
        to="today"
      />
      <DrawerListButton
        title="Upcoming"
        Icon={FaRegCalendarAlt}
        tasksNumber={upcomingCount}
        iconClassName="text-lg"
        to="upcoming"
      />
      <DrawerListButton
        title="Tasks"
        Icon={GoTasklist}
        tasksNumber={inboxCount}
        to="tasks"
      />
    </motion.div>
  );
};

export default MainDrawerSection;
