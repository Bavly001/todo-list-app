import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal-slice";
import themeReducer from "./theme/theme-slice";
import drawerReducer from "./drawer-slice";
import tasksReducer from "./tasks/tasks-slice";
import projectReducer from "./projects/project-slice";
import completedTasksReducer from "./completed-tasks/completed-tasks-slice";
import notificationReducer from "./notification-slice";
import authReducer from "./auth/auth-slice";
import feedbackReducer from "./feedback/feedback-slice";

const store = configureStore({
      reducer: {
            modal: modalReducer,
            theme: themeReducer,
            drawer: drawerReducer,
            tasks: tasksReducer,
            completedTasks: completedTasksReducer,
            projects: projectReducer,
            notification: notificationReducer,
            auth: authReducer,
            feedback: feedbackReducer
      }
})
export default store;