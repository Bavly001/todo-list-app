import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import AddTaskForm from "./task-modals/TaskForm";
import AddProjectForm from "./project-modals/AddProjectForm";
import SearchForm from "./SearchForm";
import DeleteProjectModal from "./project-modals/DeleteProjectModal";
import DeleteTaskModal from "./task-modals/DeleteTaskModal";
import NotificationBar from "./NotificationBar";

const ModalController = () => {
     const notificationTitle = useSelector((state) => state.notification.title);
     const undoButton = useSelector((state) => state.notification.undo);
     const modal = useSelector((state) => state.modal.currentModal);

     const { pathname } = useLocation();
     const currentLink = pathname.replace("app", "").replaceAll("/", "");

     useEffect(() => {
          if (modal && modal !== "")
               document.title =
                    "Doit | " +
                    modal[0].toUpperCase() +
                    `${modal}`.replaceAll("-", " ").substring(1);
          else if (currentLink && !currentLink.includes("project"))
               document.title =
                    "Doit | " +
                    currentLink[0].toUpperCase() +
                    currentLink.replaceAll("-", " ").substring(1);
          else document.title = "Doit";
     }, [currentLink, modal]);

     return (
          <AnimatePresence>
               {modal === "add-task" && <AddTaskForm title="Add New Task" />}
               {modal === "edit-task" && <AddTaskForm title="Task Details" />}
               {modal === "delete-task" && <DeleteTaskModal />}
               {modal === "add-project" && <AddProjectForm />}
               {modal === "delete-project" && <DeleteProjectModal />}
               {modal === "search" && <SearchForm />}
               {notificationTitle && (
                    <NotificationBar
                         notificationTitle={notificationTitle}
                         undoButton={undoButton}
                    />
               )}
          </AnimatePresence>
     );
};

export default ModalController;
