import Modal from "./Modal";
import { IoSearch } from "react-icons/io5";
import TaskItem from "./tasks/TaskItem";
import { useSelector } from "react-redux";
import { useState } from "react";

const SearchForm = () => {
     const [filteredTasks, setFilteredTasks] = useState([]);
     const tasks = useSelector((state) => state.tasks.tasks);

     const searchFn = (event) => {
          const searchValue = event.currentTarget.value;
          if (searchValue.length > 1) {
               const filtered = tasks.filter((task) =>
                    task.title
                         .toLowerCase()
                         .replaceAll(" ", "")
                         .includes(
                              searchValue.toLowerCase().replaceAll(" ", "")
                         )
               );
               setFilteredTasks(filtered);
               if (filtered.length === 0) setFilteredTasks(null);
          } else setFilteredTasks([]);
     };

     return (
          <Modal title="Search" buttonText="Search" submitButton={false}>
               <div className="flex gap-2 items-center">
                    <IoSearch className="text-xl mt-px" />
                    <input
                         type="text"
                         autoFocus
                         className="bg-transparent text-xl w-full focus:outline-none"
                         placeholder="Search by task title"
                         onChange={searchFn}
                    />
               </div>
               <div className="border-t-2 overflow-y-auto overflow-x-hidden">
                    {filteredTasks &&
                         filteredTasks.length > 0 &&
                         filteredTasks.map(({ id, title, date, project }) => (
                              <TaskItem
                                   key={id}
                                   id={id}
                                   title={title}
                                   date={!project && date}
                                   project={project}
                                   circleButtonDisabled
                              />
                         ))}
                    {!filteredTasks && (
                         <p className="text-gray-400 dark:text-gray-600 block text-center mt-5">
                              No tasks with this title.
                         </p>
                    )}
               </div>
          </Modal>
     );
};

export default SearchForm;
