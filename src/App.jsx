import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Today from "./pages/Today";
import UpcomingTasks from "./pages/UpcomingTasks";
import Project from "./pages/Project";
import Settings from "./pages/Settings";
import ActivityLog from "./pages/ActivityLog";
import Login from "./pages/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserToken } from "./utils/userAuth";
import { getCurrentUser } from "./store/auth/auth-actions";
import ContactUs from "./pages/ContactUs";
import Logo from "./components/Logo";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import LayoutErrorPage from "./components/error-pages/LayoutErrorPage";
import ErrorPage from "./components/error-pages/ErrorPage";

const router = createBrowserRouter([
     {
          path: "/",
          errorElement: <ErrorPage />,
          children: [
               { index: true, element: <Home /> },
               { path: "login", element: <Login /> },
               { path: "contact", element: <ContactUs /> },
               { path: "register", element: <Register /> },
               { path: "about-us", element: <AboutUs /> },
               {
                    path: "app",
                    element: <Layout />,
                    children: [
                         { path: "today", element: <Today /> },
                         { path: "tasks", element: <Tasks /> },
                         { path: "upcoming", element: <UpcomingTasks /> },
                         { path: "settings", element: <Settings /> },
                         { path: "activity-log", element: <ActivityLog /> },
                         {
                              path: "projects/project/:projectId",
                              element: <Project />,
                         },
                         { path: "*", element: <LayoutErrorPage /> },
                    ],
               },
          ],
     },
]);

function App() {
     const dispatch = useDispatch();
     const appIsLoading = useSelector((state) => state.auth.appIsLoading);

     useEffect(() => {
          if (getUserToken()) dispatch(getCurrentUser());
     }, [dispatch]);

     return (
          <>
               {appIsLoading && getUserToken() && (
                    <div className="w-full h-screen fixed top-0 left-0 bg-black bg-opacity-95 backdrop-blur-md z-50 flex justify-center items-center">
                         <Logo smallLogo className="w-40" gray />
                    </div>
               )}
               <RouterProvider router={router} />
          </>
     );
}

export default App;
