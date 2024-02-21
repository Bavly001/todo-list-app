import { FaArrowRightLong } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

const LayoutErrorPage = () => {
     const colorTheme = useSelector((state) => state.theme.color);
     const navigate = useNavigate();

     useEffect(() => {
          document.title = "Doit | 404 Page";
     }, []);

     return (
          <motion.div
               animate={{ opacity: [0, 1], y: [200, 0] }}
               transition={{ type: "tween", duration: 0.4 }}
               className="w-full h-full flex flex-col justify-center items-center text-gray-800 dark:text-gray-200 text-center"
          >
               <h1
                    className={`text-4xl md:text-5xl lg:text-8xl font-black ${colorTheme.textColor}`}
               >
                    404 PAGE
               </h1>
               <h2 className="flex items-end text-base md:text-lg lg:text-3xl">
                    Sorry, This Page is not available.
               </h2>
               <button
                    onClick={() => navigate("tasks")}
                    className={`mt-5 ${colorTheme.textColor} ${colorTheme.textHover} transition-all`}
               >
                    See your tasks <FaArrowRightLong className="inline" />
               </button>
          </motion.div>
     );
};

export default LayoutErrorPage;
