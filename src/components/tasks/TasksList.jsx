import { AnimatePresence } from "framer-motion";
import PageSection from "../PageSection";
import TaskSection from "./TasksSection";

const TasksList = ({ taskSections, toggle = false, projectLink = false }) => {
     return (
          <PageSection className="h-full flex flex-col gap-5 w-[80%] py-12 mx-auto text-gray-800 dark:text-gray-200 overflow-y-auto overflow-x-hidden">
               <AnimatePresence>
                    {taskSections &&
                         taskSections.map((taskSection, index) => (
                              <TaskSection
                                   key={index}
                                   taskSection={taskSection}
                                   toggle={toggle}
                                   projectLink={projectLink}
                              />
                         ))}
               </AnimatePresence>
          </PageSection>
     );
};

export default TasksList;
