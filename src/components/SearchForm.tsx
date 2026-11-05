import Modal from "./Modal";
import { IoSearch } from "react-icons/io5";
import TaskItem from "./tasks/TaskItem";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { RootState } from "../store";
import { Task } from "../types";
import { useViewTasks } from "../hooks/useQueries";

const SearchForm: React.FC = () => {
  const [query, setQuery] = useState("");
  const reduxTasks = useSelector((state: RootState) => state.tasks.tasks);

  const { data: backendMatches } = useViewTasks("all", {
    search: query.trim().length > 1 ? query.trim() : undefined,
  });

  const searchFn = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  let filteredTasks: Task[] | null = [];
  if (query.trim().length > 1) {
    if (backendMatches && backendMatches.length > 0) {
      filteredTasks = backendMatches;
    } else if (Array.isArray(reduxTasks)) {
      const localFiltered = reduxTasks.filter((task) =>
        task.title
          .toLowerCase()
          .replaceAll(" ", "")
          .includes(query.toLowerCase().replaceAll(" ", ""))
      );
      filteredTasks = localFiltered.length === 0 ? null : localFiltered;
    } else if (backendMatches && backendMatches.length === 0) {
      filteredTasks = null;
    }
  }

  return (
    <Modal title="Search" buttonText="Search" submitButton={false}>
      <div className="flex gap-2 items-center">
        <IoSearch className="text-xl mt-px" />
        <input
          type="text"
          autoFocus
          className="bg-transparent text-xl w-full focus:outline-none"
          placeholder="Search by task title"
          value={query}
          onChange={searchFn}
        />
      </div>
      <div className="border-t-2 overflow-y-auto overflow-x-hidden">
        {filteredTasks &&
          filteredTasks.length > 0 &&
          filteredTasks.map(({ id, title, date, project, description }) => (
            <TaskItem
              key={id}
              id={id}
              title={title}
              description={description}
              date={!project ? date : undefined}
              project={project}
              circleButtonDisabled
            />
          ))}
        {filteredTasks === null && (
          <p className="text-gray-400 dark:text-gray-600 block text-center mt-5">
            No tasks with this title.
          </p>
        )}
      </div>
    </Modal>
  );
};

export default SearchForm;
