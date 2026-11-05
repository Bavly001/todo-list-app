import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef } from "react";

export interface DropDownMenuProps {
  buttonClassName?: string;
  buttonContent?: React.ReactNode;
  open: boolean;
  onClose: () => void;
  toggle?: () => void;
  children?: React.ReactNode;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({
  buttonClassName,
  buttonContent,
  open,
  onClose,
  toggle,
  children,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(target) &&
        !buttonRef.current.contains(target)
      ) {
        onClose();
      }
    };
    if (open) document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [onClose, open]);

  return (
    <>
      <div className="relative w-4/5 sm:w-4/5 md:w-2/5 lg:w-2/5 mx-auto sm:mx-auto md:mx-0 lg:mx-0 z-30">
        <button
          onClick={toggle ?? undefined}
          type="button"
          className={buttonClassName}
          ref={buttonRef}
        >
          {buttonContent}
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              ref={menuRef}
              className="transition-all ease-out duration-300 absolute z-50 left-0 mt-[1px] text-sm lg:text-xs 2xl:text-sm mb-2.5 translate-y-0 min-w-[220px] max-w-[280px]"
            >
              <div className="absolute h-4 w-4 rotate-45 mt-0.5 ml-[1.2rem] border-l border-t border-gray-300 bg-gray-100 dark:bg-gray-800 dark:border-gray-600"></div>
              <div className="mt-2.5 shadow-xl border border-gray-300 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-lg overflow-hidden max-h-56 overflow-y-auto">
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
