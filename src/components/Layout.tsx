import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Drawer from "./drawer/Drawer";
import { useDispatch, useSelector } from "react-redux";
import DrawerButton from "./drawer/DrawerButton";
import { drawerActions } from "../store/drawer-slice";
import { useEffect, useState } from "react";
import {
  fetchProjectsList,
  updateProjects,
} from "../store/projects/project-actions";
import { useWindowWidth } from "@react-hook/window-size";
import { themeActions } from "../store/theme/theme-slice";
import {
  fetchCompletedTasks,
  updateCompletedTasks,
} from "../store/completed-tasks/completed-tasks-actions";
import { AnimatePresence, motion } from "framer-motion";
import ModalController from "./ModalController";
import { getUserTheme, setUserTheme } from "../store/theme/theme-actions";
import { getUserToken } from "../utils/userAuth";
import Logo from "./Logo";
import { RootState } from "../store";

const Layout = () => {
  const dispatch = useDispatch();
  const width = useWindowWidth();

  const { pathname } = useLocation();
  const currentLink = pathname.replace("app", "").replaceAll("/", "");
  const navigate = useNavigate();

  const theme = useSelector((state: RootState) => state.theme);
  const themeMode = theme?.mode;
  const themeColor = theme?.color.mainColor;

  const completedTasks = useSelector((state: RootState) => state.completedTasks);
  const projects = useSelector((state: RootState) => state.projects);

  const drawerOpen = useSelector((state: RootState) => state.drawer.isOpen);

  const isUserAuth = useSelector((state: RootState) => state.auth.isUserAuthenticated);
  const appIsLoading = useSelector((state: RootState) => state.auth.appIsLoading);
  const themeIsLoading = useSelector((state: RootState) => state.theme.themeIsLoading);

  const [, setAppStarts] = useState(0);

  useEffect(() => {
    setAppStarts((prev) => prev + 1);
  }, [isUserAuth]);

  useEffect(() => {
    const modal = document.getElementById("modal");
    const root = document.getElementById("root");

    if (modal && root) {
      if (themeMode === "dark") {
        root.className = "dark";
        modal.className = "dark";
      } else {
        root.className = "";
        modal.className = "";
      }
    }

    if (themeColor === "" && !theme.themeIsLoading) {
      dispatch(themeActions.changeColorBlue());
    } else {
      switch (themeColor) {
        case "blue":
          dispatch(themeActions.changeColorBlue());
          break;
        case "cyan":
          dispatch(themeActions.changeColorCyan());
          break;
        case "teal":
          dispatch(themeActions.changeColorTeal());
          break;
        case "green":
          dispatch(themeActions.changeColorGreen());
          break;
        case "lime":
          dispatch(themeActions.changeColorLime());
          break;
        case "orange":
          dispatch(themeActions.changeColorOrange());
          break;
        case "pink":
          dispatch(themeActions.changeColorPink());
          break;
        case "purple":
          dispatch(themeActions.changeColorPurple());
          break;
        default:
          break;
      }
    }
  }, [themeColor, dispatch, themeMode, theme.themeIsLoading]);

  useEffect(() => {
    if (currentLink === "") navigate("today");
  }, [navigate, currentLink]);

  useEffect(() => {
    if (getUserToken()) {
      dispatch<any>(fetchCompletedTasks());
      dispatch<any>(fetchProjectsList());
      dispatch<any>(getUserTheme());
    }
  }, [dispatch, isUserAuth]);

  useEffect(() => {
    if (theme.changed && getUserToken())
      dispatch<any>(setUserTheme({ mode: theme.mode, color: theme.color }));
  }, [dispatch, theme]);

  useEffect(() => {
    if (completedTasks.changed && getUserToken()) {
      dispatch<any>(
        updateCompletedTasks(
          Array.isArray(completedTasks.completedTasks) ? completedTasks.completedTasks : []
        )
      );
    }
  }, [dispatch, completedTasks]);

  useEffect(() => {
    if (projects.changed && getUserToken()) {
      dispatch<any>(updateProjects(Array.isArray(projects.projects) ? projects.projects : []));
    }
  }, [dispatch, projects]);

  useEffect(() => {
    if (width <= 768) dispatch(drawerActions.drawerToggle(false));
    else dispatch(drawerActions.drawerToggle(true));
  }, [width, dispatch]);

  useEffect(() => {
    if (!isUserAuth && !appIsLoading && !getUserToken()) {
      navigate("/");
    }
  }, [appIsLoading, isUserAuth, navigate]);

  return (
    <>
      {themeIsLoading && (
        <div className="w-full h-screen fixed top-0 left-0 bg-black bg-opacity-95 backdrop-blur-md z-50 flex justify-center items-center">
          <Logo smallLogo className="w-40" gray />
        </div>
      )}
      <AnimatePresence>
        <div className="flex flex-row-reverse h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
          <ModalController />
          <motion.div
            layout
            initial={false}
            className={
              drawerOpen
                ? "lg:w-4/5 md:w-3/5 sm:w-full w-full overflow-hidden z-10 bg-gray-100 dark:bg-gray-900"
                : "w-full z-10"
            }
          >
            {!drawerOpen && (
              <motion.div
                initial={{ opacity: 0, x: -300 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.2,
                  type: "tween",
                }}
              >
                <DrawerButton className="fixed top-2 left-1 lg:top-5 lg:left-3" />
              </motion.div>
            )}
            <Outlet />
          </motion.div>
          <AnimatePresence>
            {drawerOpen && (
              <motion.div
                initial={{ x: -1000 }}
                animate={{ x: 0 }}
                exit={{ x: -1000 }}
                layout
                transition={{
                  type: "tween",
                  duration: 0.5,
                }}
                className={`w-full fixed top-0 left-0 flex ${
                  width <= 768 ? "z-10" : ""
                }`}
              >
                <div className="w-4/5 h-screen lg:w-1/5 md:w-2/5 sm:w-3/5">
                  <Drawer />
                </div>
                {width <= 768 && (
                  <div
                    className="w-1/5 h-screen lg:w-4/5 md:w-3/5 sm:w-2/5"
                    onClick={() =>
                      dispatch(
                        drawerActions.drawerToggle()
                      )
                    }
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </AnimatePresence>
    </>
  );
};

export default Layout;
