import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NavBarMenu = ({ menuOpened }) => {
     const container = {
          hidden: { opacity: 0 },
          show: {
               opacity: 1,
               transition: {
                    staggerChildren: 0.15,
               },
          },
     };

     const listItem = {
          hidden: { y: -10, opacity: 0 },
          show: { y: 0, opacity: 1 },
     };

     const listItemClassName = "hover:text-blue-500 transition-all";

     const navigate = useNavigate();

     return (
          <motion.ul
               variants={container}
               initial="hidden"
               animate="show"
               exit="hidden"
               className={`md:flex gap-3 ${
                    menuOpened
                         ? "w-full px-[15%] py-8 h-full flex flex-col justify-between text-lg"
                         : "hidden md:flex items-center"
               }`}
          >
               <div className="flex flex-col justify-between h-3/5 gap-y-2 md:gap-y-0 md:h-auto md:flex-row md:items-center md:border-e-2 md:border-gray-200 md:pe-3 md:gap-6">
                    <motion.li
                         variants={listItem}
                         role="button"
                         className={listItemClassName}
                         onClick={() => navigate("/")}
                    >
                         Home
                    </motion.li>
                    <motion.li
                         variants={listItem}
                         role="button"
                         className={listItemClassName}
                         onClick={() => navigate("/contact")}
                    >
                         Contact
                    </motion.li>
                    <motion.li
                         variants={listItem}
                         role="button"
                         className={listItemClassName}
                         onClick={() => navigate("/about-us")}
                    >
                         About us
                    </motion.li>
               </div>
               <div className="flex justify-between h-2/5 gap-y-2 md:gap-y-0 md:h-auto md:flex-row md:items-center md:gap-6 border-t-2 pt-4 md:border-t-0 md:pt-0">
                    <motion.li
                         variants={listItem}
                         role="button"
                         className="bg-blue-600 text-gray-50 px-3 py-1 lg:px-5 lg:py-1.5 rounded-md w-2/3 md:w-auto hover:bg-blue-800 transition-all text-center"
                         onClick={() => navigate("/register")}
                    >
                         Join us
                    </motion.li>
                    <motion.li
                         variants={listItem}
                         role="button"
                         className={listItemClassName}
                         onClick={() => navigate("/login")}
                    >
                         Login
                    </motion.li>
               </div>
          </motion.ul>
     );
};

export default NavBarMenu;
