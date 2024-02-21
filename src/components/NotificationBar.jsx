import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { notificationActions } from "../store/notification-slice";
import { useEffect } from "react";
import { motion } from "framer-motion";

const NotificationBar = ({ notificationTitle, undoButton }) => {
     const dispatch = useDispatch();
     const colorTheme = useSelector((state) => state.theme.color.textColor);
     const undoClicked = useSelector((state) => state.notification.undoClicked);

     useEffect(() => {
          const notificationRemove = setTimeout(
               () => dispatch(notificationActions.hideNotification()),
               3900
          );

          return () => clearTimeout(notificationRemove);
     }, [dispatch, notificationTitle]);

     return createPortal(
          <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="flex gap-x-4 justify-between items-center overflow-hidden text-gray-900 bg-gray-300 dark:text-gray-200 fixed z-30 bottom-8 start-10 h-14 rounded-lg min-w-72 dark:bg-gray-950 shadow-lg"
          >
               <h1 className="text-center ms-5">{notificationTitle}</h1>
               {undoButton && (
                    <button
                         disabled={undoClicked}
                         onClick={() => {
                              dispatch(notificationActions.undoClicked());
                              setTimeout(() => {
                                   dispatch(
                                        notificationActions.hideNotification()
                                   );
                              }, 50);
                         }}
                         className={colorTheme}
                    >
                         Undo
                    </button>
               )}
               <button
                    className="h-full px-2 flex justify-center items-center"
                    onClick={() =>
                         dispatch(notificationActions.hideNotification())
                    }
               >
                    <IoClose className="text-lg" />
               </button>
          </motion.div>,
          document.getElementById("modal")
     );
};

export default NotificationBar;
