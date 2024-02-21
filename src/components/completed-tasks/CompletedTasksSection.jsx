import { useSelector } from "react-redux";
import Loader from "../Loader";
import CompletedTaskItem from "./CompletedTaskItem";
import LoadMore from "./LoadMore";
import { useState } from "react";

const CompletedTasksSection = () => {
     const completedTasks = useSelector(
          (state) => state.completedTasks.completedTasks
     );
     const [viewedTasksNumber, setViewedTasksNumber] = useState(7);

     const viewMoreTasks = () => {
          const incrementNumber = 10;
          setViewedTasksNumber((prev) => {
               if (prev + incrementNumber <= completedTasks.length)
                    return prev + incrementNumber;
               else return completedTasks.length;
          });
     };

     let content = (
          <div className="w-full mt-10 flex">
               <Loader />
          </div>
     );

     if (completedTasks !== "Loading") {
          if (
               !completedTasks ||
               completedTasks === null ||
               completedTasks?.length === 0
          )
               content = (
                    <p className="text-gray-400 text-center lg:mt-3">
                         You do not complete any task yet.
                    </p>
               );
          if (completedTasks && completedTasks?.length > 0)
               content = (
                    <>
                         {[...completedTasks]
                              .reverse()
                              .slice(0, viewedTasksNumber)
                              .map((task) => (
                                   <CompletedTaskItem
                                        key={task.id}
                                        title={task.title}
                                        description={task.description ?? null}
                                        date={task.date ?? null}
                                        project={task.project ?? null}
                                        completionDate={task.completionDate}
                                   />
                              ))}
                         {completedTasks.length > viewedTasksNumber && (
                              <LoadMore onClick={viewMoreTasks} />
                         )}
                    </>
               );
     }

     return <div>{content}</div>;
};

export default CompletedTasksSection;
