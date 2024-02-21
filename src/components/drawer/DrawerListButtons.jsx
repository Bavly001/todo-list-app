import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { drawerActions } from "../../store/drawer-slice";
import { useWindowWidth } from "@react-hook/window-size";
import { motion } from "framer-motion";

const DrawerListButton = ({
     title,
     Icon,
     className = "",
     iconClassName,
     tasksNumber,
     Component = NavLink,
     deleteBtn = false,
     deleteProject,
     onClick,
     ...props
}) => {
     const classes =
          "w-full p-2 rounded-lg flex justify-between hover:bg-gray-300 dark:hover:bg-gray-700 relative overflow-hidden";
     const colorTheme = useSelector((state) => state.theme.color);
     const width = useWindowWidth();
     const dispatch = useDispatch();
     const navigate = useNavigate();

     return (
          <motion.div
               variants={{
                    hidden: { x: -1000 },
                    show: { x: 0, transition: { type: "tween" } },
               }}
               initial={{ x: -1000 }}
               animate={{ x: 0 }}
               exit={{ x: -1000 }}
               transition={{ delay: 0.3, type: "tween" }}
          >
               <Component
                    {...props}
                    className={
                         Component === NavLink
                              ? ({ isActive }) =>
                                     isActive
                                          ? `w-full p-2 rounded-lg flex justify-between relative overflow-hidden cursor-default ${colorTheme.secondaryBg} ${colorTheme.textColor}`
                                          : classes
                              : classes
                    }
                    onClick={(event) => {
                         event.preventDefault();
                         onClick && onClick();
                         props.to && navigate(props.to);
                         if (width <= 768)
                              dispatch(drawerActions.drawerToggle(false));
                    }}
               >
                    <div className={`flex items-center gap-1 ${className}`}>
                         <Icon className={iconClassName ?? "text-xl"} />
                         <span className="capitalize">{title}</span>
                    </div>
                    {deleteBtn ? (
                         <button
                              onClick={(event) => {
                                   event.stopPropagation();
                                   event.preventDefault();
                                   deleteProject();
                              }}
                              className={`
                              ${colorTheme.bgHover}  
                              ${colorTheme.bgColor}
                              absolute right-0 top-0 h-full px-2
                              `}
                         >
                              <RiDeleteBin6Line className="text-gray-100 dark:text-gray-900" />
                         </button>
                    ) : (
                         <span>{tasksNumber ?? ""}</span>
                    )}
               </Component>
          </motion.div>
     );
};

export default DrawerListButton;
