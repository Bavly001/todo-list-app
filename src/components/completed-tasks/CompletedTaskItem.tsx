const CompletedTaskItem = ({
     title,
     date,
     description,
     project,
     completionDate,
}) => {
     return (
          <div className="flex gap-2 w-[96%] float-end px-2 pb-2 pt-4 border-b-2 border-gray-200 dark:border-gray-800">
               <div>
                    <p className="font-semibold text-lg">{title}</p>
                    <div className="flex flex-col gap-1">
                         {description && description !== "" && (
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                   Description: {description}
                              </p>
                         )}
                         <div className=" flex flex-wrap gap-y-1 gap-x-5">
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                   Completion date:{" "}
                                   <span className="font-semibold text-gray-800 dark:text-gray-200">
                                        {completionDate}
                                   </span>
                              </p>
                              {date && date !== "" && (
                                   <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Due date:{" "}
                                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                                             {date}
                                        </span>
                                   </p>
                              )}
                              {project && project !== "" && (
                                   <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Project:{" "}
                                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                                             {project.projectTitle}
                                        </span>
                                   </p>
                              )}
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default CompletedTaskItem;
