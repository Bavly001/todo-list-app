import { motion } from "framer-motion";

const ThemeButton = ({
     borderColor,
     bgColor,
     active = false,
     ...props
}) => {
     return (
          <motion.div
               variants={{
                    hidden: { x: -200, opacity: 0 },
                    show: { x: 0, opacity: 1, transition: { type: "tween" } },
               }}
               className={
                    active
                         ? "border-2 border-amber-300 rounded-full shadow"
                         : ""
               }
          >
               <button
                    className={`rounded-full border-4 p-1 shadow ${
                         borderColor ?? ""
                    }`}
                    {...props}
               >
                    <div
                         className={`rounded-full p-3 shadow ${bgColor ?? ""}`}
                    />
               </button>
          </motion.div>
     );
};

export default ThemeButton;
