import { IoIosArrowDown } from "react-icons/io";
import wallpaper from "../../assets/home_wallpaper.svg";
import { motion } from "framer-motion";
import HomeSectionContainer from "./HomeSectionContainer";

const Header = () => {
     return (
          <HomeSectionContainer className="md:flex-row pt-12 lg:pt-20 gap-y-6 items-center">
               <div className="text-center md:w-2/5 px-14">
                    <h1 className="text-4xl lg:text-7xl font-bold mb-5">
                         Feel your life so messy?
                    </h1>
                    <h2 className="text-gray-500 text-lg lg:text-2xl font-semibold">
                         We will help you to start arranging your life.
                    </h2>
                    <p className="flex justify-center mt-1 lg:mt-4 text-gray-400 text-sm lg:text-base">
                         Scroll for help{" "}
                         <motion.span
                              animate={{ y: [2, -2, 2] }}
                              transition={{ repeat: Infinity }}
                         >
                              <IoIosArrowDown className="mt-1.5 ms-0.5 text-xs lg:text-sm" />
                         </motion.span>
                    </p>
               </div>
               <div className="w-[150%] md:w-3/5">
                    <img draggable={false} src={wallpaper} className="w-full" />
               </div>
          </HomeSectionContainer>
     );
};

export default Header;
