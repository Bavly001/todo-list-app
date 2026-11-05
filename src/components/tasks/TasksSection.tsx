import TaskItem from "./TaskItem";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import AddTaskButton from "../AddTaskButton";
import SectionTitle from "../SectionTitle";
import { AnimatePresence, motion } from "framer-motion";

export interface TaskSectionProps {
  taskSection: {
    title: string;
    tasks: any;
  };
  toggle?: any;
  projectLink?: boolean;
}

const TaskSection: React.FC<TaskSectionProps> = ({ taskSection, toggle, projectLink }) => {
  const [showTasks, setShowTasks] = useState(true);

  const toggleTasks = () => {
    setShowTasks((prev) => !prev);
  };

  let content: React.ReactNode = (
    <div className="w-full mt-10 flex">
      <Loader />
    </div>
  );

  if (taskSection.tasks !== "Loading") {
    if (
      !taskSection.tasks ||
      taskSection.tasks === null ||
      taskSection.tasks?.length === 0
    ) {
      content = (
        <>
          {(!taskSection.tasks || taskSection.tasks?.length === 0) && (
            <AddTaskButton />
          )}
        </>
      );
    }
    if (Array.isArray(taskSection.tasks) && taskSection.tasks.length > 0) {
      content = (
        <AnimatePresence>
          {taskSection.tasks.map((task: any) => (
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description ?? null}
              date={task.date ?? null}
              project={task.project ?? null}
              projectLink={projectLink}
            />
          ))}
        </AnimatePresence>
      );
    }
  }

  useEffect(() => {
    if (toggle) {
      if (!taskSection.title.toLowerCase().includes("today")) {
        if (new Date() > new Date(taskSection.title)) {
          setShowTasks(false);
        }
      }
    }
  }, [taskSection.title, toggle]);

  return (
    <motion.section
      initial={{ x: 500 }}
      animate={{ x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ type: "tween" }}
    >
      <SectionTitle
        title={taskSection.title}
        toggle={
          toggle &&
          Array.isArray(taskSection.tasks) &&
          taskSection.tasks.length > 0
        }
        toggleTasks={toggleTasks}
        showTasks={showTasks}
      />

      {showTasks && content}
    </motion.section>
  );
};

export default TaskSection;
