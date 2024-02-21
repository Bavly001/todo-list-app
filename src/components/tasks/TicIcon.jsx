import { motion } from "framer-motion";

const TicIcon = () => {
     return (
          <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={4.5}
               className="stroke-gray-100 dark:stroke-gray-900"
          >
               <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    exit={{ pathLength: 0 }}
                    d="M4.5 12.75l6 6 9-13.5"
               />
          </svg>
     );
};

export default TicIcon;
