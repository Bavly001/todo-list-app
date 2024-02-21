import { useCallback, useState } from "react";
import DropDownMenu from "../../DropDownMenu";
import { IoPersonCircleSharp, IoSettingsOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { LuActivitySquare } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import TopDrawerMenuButton from "./TopDrawerMenuButton";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useWindowWidth } from "@react-hook/window-size";
import { drawerActions } from "../../../store/drawer-slice";
import { shortMonthFormat } from "../../../utils/dateFormatter";
import { authActions } from "../../../store/auth/auth-slice";

const TopDrawerMenuList = () => {
     const dispatch = useDispatch();
     const [open, setOpen] = useState(false);
     const onClose = useCallback(() => {
          setOpen(false);
     }, []);
     const toggle = () => {
          setOpen((prev) => !prev);
     };
     const colorTheme = useSelector((state) => state.theme.color);
     const currentUser = useSelector((state) => state.auth.currentUser);

     const buttonClassName =
          "flex justify-center items-center gap-1 p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700";

     const buttonContent = (
          <>
               <IoPersonCircleSharp className="font-bold text-3xl" />
               <h1 className="font-bold">{currentUser?.firstName}</h1>
               <IoIosArrowDown className="mt-1" />
          </>
     );
     const navigate = useNavigate();
     const width = useWindowWidth();
     const onNavigate = (link) => {
          navigate("/app/" + link);
          onClose();
          if (width <= 768) dispatch(drawerActions.drawerToggle(false));
     };

     const completedTasks = useSelector(
          (state) => state.completedTasks.completedTasks
     );

     const completedTasksLength =
          completedTasks &&
          completedTasks !== "Loading" &&
          completedTasks?.filter(
               (task) => task.completionDate === shortMonthFormat(new Date())
          ).length;

     return (
          <DropDownMenu
               buttonClassName={buttonClassName}
               buttonContent={buttonContent}
               open={open}
               toggle={toggle}
               onClose={onClose}
          >
               <div className="flex flex-col">
                    <div className="border-b dark:border-b-600 p-5 flex justify-between items-center">
                         <div className="border-2 border-gray-700 dark:border-gray-300 me-3 rounded-full">
                              <TiTick
                                   className={
                                        colorTheme.textColor +
                                        " text-3xl " +
                                        colorTheme.darkTextColor
                                   }
                              />
                         </div>
                         <div>
                              <h1 className="font-bold text-gray-700 dark:text-gray-300">
                                   {currentUser?.firstName +
                                        " " +
                                        currentUser?.lastName}
                              </h1>
                              <small className="text-gray-500">
                                   You achieved{" "}
                                   <span className={`${colorTheme.textColor}`}>
                                        {completedTasksLength ?? 0}
                                   </span>{" "}
                                   task{completedTasksLength > 1 && "s"} today.
                              </small>
                         </div>
                    </div>
                    <div className="border-b">
                         <TopDrawerMenuButton
                              Icon={LuActivitySquare}
                              onClick={() => {
                                   onNavigate("activity-log");
                              }}
                              buttonText="Activity Log"
                         />
                         <TopDrawerMenuButton
                              Icon={IoSettingsOutline}
                              onClick={() => {
                                   onNavigate("settings");
                              }}
                              buttonText="Settings"
                         />
                    </div>
                    <TopDrawerMenuButton
                         Icon={FiLogOut}
                         onClick={() => {
                              dispatch(authActions.logout());
                         }}
                         buttonText="Logout"
                    />
               </div>
          </DropDownMenu>
     );
};

export default TopDrawerMenuList;
