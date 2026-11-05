import { createPortal } from "react-dom";
import { modalActions } from "../store/modal-slice";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoClose, IoCheckmarkCircleOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { RootState } from "../store";
import React from "react";
import { useModalParams } from "../hooks/useModalParams";

export interface ModalProps {
  title?: string;
  buttonText?: string;
  submitButton?: boolean;
  onSubmit?: (e?: any) => void;
  onClose?: () => void;
  deleteButton?: boolean;
  deleteFn?: () => void;
  children?: React.ReactNode;
  cancelButton?: any;
  cancelButtonText?: string;
  completeButton?: boolean;
  onComplete?: () => void;
  completeButtonText?: string;
}

const Modal: React.FC<ModalProps> = ({
  title,
  buttonText,
  submitButton = true,
  onSubmit,
  onClose,
  deleteButton,
  deleteFn,
  children,
  cancelButton,
  cancelButtonText,
  completeButton,
  onComplete,
  completeButtonText,
}) => {
  const dispatch = useDispatch();
  const { closeModal } = useModalParams();

  const handleClose = () => {
    onClose?.();
    closeModal();
    dispatch(modalActions.close());
  };

  const colorTheme = useSelector((state: RootState) => state.theme.color);

  const modalContainer = document.getElementById("modal");
  if (!modalContainer) return null;

  const resolvedCloseText =
    cancelButtonText ||
    (typeof cancelButton === "string" ? cancelButton : "Close");

  return createPortal(
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="fixed inset-0 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm dark:bg-opacity-80 z-30"
      />
      <motion.dialog
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -40, scale: 0.95 }}
        transition={{ type: "tween", duration: 0.2 }}
        open
        className="fixed inset-x-0 mx-auto top-[5vh] sm:top-[8vh] md:top-[10vh] w-[94%] sm:w-[85%] md:w-[560px] max-w-[95vw] h-auto max-h-[90vh] rounded-xl p-5 sm:p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 z-40 flex flex-col shadow-2xl overflow-visible"
      >
        <div className="font-bold text-xl pb-2 border-b-2 border-gray-200 dark:border-gray-800 flex items-center justify-between shrink-0">
          <h1 className="text-xl font-bold truncate pr-2">{title}</h1>
          <button
            type="button"
            onClick={handleClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors shrink-0"
            aria-label="Close"
          >
            <IoClose className="text-2xl" />
          </button>
        </div>
        <form
          className="mt-4 flex flex-col gap-4 overflow-visible flex-1"
          onSubmit={onSubmit}
        >
          {children}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-200 dark:border-gray-800 mt-auto shrink-0">
            <div>
              {deleteButton && (
                <button
                  type="button"
                  onClick={deleteFn}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                >
                  <RiDeleteBin6Line className="text-base" />
                  <span>Delete</span>
                </button>
              )}
            </div>
            <div className="flex items-center gap-2.5 sm:gap-3 ms-auto">
              {completeButton && onComplete && (
                <button
                  type="button"
                  onClick={onComplete}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-600 dark:hover:bg-emerald-500 shadow-sm transition-all"
                >
                  <IoCheckmarkCircleOutline className="text-lg" />
                  <span>{completeButtonText || "Mark as completed"}</span>
                </button>
              )}
              {submitButton && (
                <button
                  type="submit"
                  className={`${colorTheme.bgColor} text-gray-100 dark:text-gray-900 py-1.5 px-5 rounded-md ${colorTheme.bgHover} font-medium text-sm transition-all shadow-sm`}
                >
                  {buttonText ?? "Add"}
                </button>
              )}
              <button
                type="button"
                onClick={handleClose}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 font-medium text-sm transition-all px-2 py-1.5"
              >
                {resolvedCloseText}
              </button>
            </div>
          </div>
        </form>
      </motion.dialog>
    </>,
    modalContainer
  );
};

export default Modal;
