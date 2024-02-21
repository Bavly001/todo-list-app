import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

const DropDownMenu = ({
     buttonClassName,
     buttonContent,
     open,
     onClose,
     toggle,
     children,
}) => {
     const menuRef = useRef();
     const buttonRef = useRef();

     useEffect(() => {
          const handler = (event) => {
               if (
                    !menuRef.current.contains(event.target) &&
                    !buttonRef.current.contains(event.target)
               )
                    onClose();
          };
          if (open) document.addEventListener("mousedown", handler);

          return () => {
               document.removeEventListener("mousedown", handler);
          };
     }, [onClose, open]);

     return (
          <>
               <div className="w-4/5 sm:w-4/5 md:w-2/5 lg:w-2/5 mx-auto sm:mx-auto md:mx-0 lg:mx-0 z-30">
                    {
                         <button
                              onClick={toggle ?? undefined}
                              type="button"
                              className={buttonClassName}
                              ref={buttonRef}
                         >
                              {buttonContent}
                         </button>
                    }
                    <AnimatePresence>
                         {open && (
                              <motion.div
                                   initial={{ opacity: 0, y: 10 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   exit={{ opacity: 0, y: 10 }}
                                   ref={menuRef}
                                   className="transition-all ease-out duration-300 absolute z-10 mt-[1px] text-sm lg:text-xs 2xl:text-sm mb-2.5 translate-y-0"
                              >
                                   <div className="absolute h-4 w-4 rotate-45 mt-0.5 ml-[1.2rem] border-l border-t border-gray-300 bg-gray-100 dark:bg-gray-800 dark:border-gray-600"></div>
                                   <div className="mt-2.5 shadow-sm border border-gray-300 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-lg overflow-hidden">
                                        {children}
                                   </div>
                              </motion.div>
                         )}
                    </AnimatePresence>
               </div>
          </>
     );
};

export default DropDownMenu;
