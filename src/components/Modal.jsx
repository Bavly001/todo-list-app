import { createPortal } from "react-dom";
import { modalActions } from "../store/modal-slice";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { motion } from "framer-motion";

const Modal = ({
     title,
     buttonText,
     submitButton = true,
     onSubmit,
     onClose,
     deleteButton,
     deleteFn,
     children,
}) => {
     const dispatch = useDispatch();
     const handleClose = () => {
          onClose && onClose();
          dispatch(modalActions.close());
     };
     const colorTheme = useSelector((state) => state.theme.color);
     return createPortal(
          <>
               <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                    className="fixed w-full h-screen bg-black bg-opacity-50 backdrop-blur-sm dark:bg-opacity-80 z-20"
               />
               <motion.dialog
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                    transition={{ type: "tween" }}
                    open
                    className="top-6 sm:top-6 lg:top-32 w-4/5 sm:w-4/5 md:w-3/5 lg:w-2/5 min-h-36 max-h-96 rounded-xl p-5 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 z-20"
               >
                    <h1 className="font-bold text-xl pb-2 border-b-2 border-gray-200 dark:border-gray-800 flex items-center justify-between">
                         {title}
                         {deleteButton && (
                              <button
                                   className={`${colorTheme.bgColor} ${colorTheme.bgHover} p-2 rounded-md`}
                                   onClick={deleteFn ?? undefined}
                              >
                                   <RiDeleteBin6Line className="text-gray-100 dark:text-gray-900" />
                              </button>
                         )}
                    </h1>
                    <form
                         className="mt-5 flex flex-col gap-4 max-h-72"
                         onSubmit={onSubmit}
                    >
                         {children}
                         <div className="flex gap-5 self-end px-2">
                              {submitButton && (
                                   <button
                                        type="submit"
                                        className={`${colorTheme.bgColor} text-gray-100 dark:text-gray-900 py-1 px-6 rounded-md ${colorTheme.bgHover}`}
                                   >
                                        {buttonText ?? "Add"}
                                   </button>
                              )}
                              <button
                                   type="button"
                                   onClick={handleClose}
                                   className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400"
                              >
                                   Cancel
                              </button>
                         </div>
                    </form>
               </motion.dialog>
          </>,
          document.getElementById("modal")
     );
};

export default Modal;
