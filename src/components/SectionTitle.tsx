import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { RootState } from "../store";
import React from "react";

export interface SectionTitleProps {
  title?: string;
  toggle?: any;
  toggleTasks?: () => void;
  showTasks?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, toggle, toggleTasks, showTasks }) => {
  const colorTheme = useSelector((state: RootState) => state.theme.color);
  const titleClasses = "ps-2 text-xl font-bold w-full";

  return (
    <div
      className={`flex items-center pb-2 border-b-2 border-gray-200 dark:border-gray-800 ${
        toggle ? "cursor-pointer" : ""
      }`}
      onClick={toggle ? toggleTasks : undefined}
    >
      {title?.includes("(") ? (
        <h1 className={titleClasses}>
          {title.split("(")[0]}{" "}
          <small className={`text-sm ${colorTheme.textColor}`}>
            ({title.split("(")[1]}
          </small>
        </h1>
      ) : (
        <h1 className={titleClasses}>{title}</h1>
      )}
      {toggle && (
        <motion.div
          animate={{ rotate: showTasks ? 0 : -90 }}
        >
          <IoIosArrowDown />
        </motion.div>
      )}
    </div>
  );
};

export default SectionTitle;
