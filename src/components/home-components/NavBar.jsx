import { useWindowWidth } from "@react-hook/window-size";
import Logo from "../Logo";
import { Squash } from "hamburger-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import NavBarMenu from "./NavBarMenu";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
     const width = useWindowWidth();
     const hideMenu = width <= 768;
     const [smallNavBar, setSmallNavBar] = useState(false);

     const changeNavBarBg = () => {
          if (window.scrollY >= 30) setSmallNavBar(true);
          else setSmallNavBar(false);
     };

     const [menuOpened, setMenuOpened] = useState(false);

     const navigate = useNavigate();

     window.addEventListener("scroll", changeNavBarBg);

     useEffect(() => {
          if (width > 768) setMenuOpened(false);
     }, [width]);

     return (
          <nav
               className={`w-full px-6 md:px-12 lg:px-24 flex items-center justify-between fixed top-0 z-30 transition-all flex-wrap md:flex-nowrap bg-gray-50 ${
                    smallNavBar
                         ? "h-10 lg:h-12 shadow text-xs"
                         : "h-12 lg:h-20 text-sm"
               } ${menuOpened ? "h-fit shadow" : ""}
               `}
          >
               <Logo
                    className={`transition-all ${
                         smallNavBar ? "mb-1 w-10 h-10 lg:w-16 lg:h-16" : "w-12 lg:w-20 h-12 lg:h-20"
                    }`}
                    role="button"
                    onClick={() => navigate("/")}
                    smallLogo={smallNavBar}
               />
               <AnimatePresence>
                    {hideMenu && (
                         <motion.button
                              initial={{ y: -10, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: -10, opacity: 0 }}
                         >
                              <Squash
                                   size={20}
                                   color="#111827"
                                   distance="sm"
                                   toggled={menuOpened}
                                   toggle={setMenuOpened}
                              />
                         </motion.button>
                    )}
               </AnimatePresence>
               <NavBarMenu menuOpened={hideMenu && menuOpened} />
          </nav>
     );
};

export default NavBar;
