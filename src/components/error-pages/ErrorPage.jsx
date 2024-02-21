import { MdErrorOutline } from "react-icons/md";
import NavBar from "../home-components/NavBar";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ErrorPage = () => {
     const navigate = useNavigate();
     const userAuth = useSelector((state) => state.auth.isUserAuthenticated);
     const appIsLoading = useSelector((state) => state.auth.appIsLoading);

     useEffect(() => {
          if (userAuth && !appIsLoading) {
               navigate("/app/error");
          }
     }, [appIsLoading, navigate, userAuth]);

     useEffect(() => {
          document.title = "Doit | 404 Page";
     }, []);

     return (
          <div className="bg-gray-50">
               <NavBar />
               <motion.div
                    animate={{ opacity: [0, 1], y: [200, 0] }}
                    transition={{ type: "tween", duration: 0.4 }}
                    className="w-full min-h-screen py-12 lg:py-20 flex flex-col justify-center items-center text-center"
               >
                    <h1 className="text-4xl md:text-5xl lg:text-8xl font-black text-blue-600 ">
                         <MdErrorOutline className="inline me-2 align-sub" />
                         404 PAGE
                    </h1>
                    <h2 className="flex items-end text-base md:text-lg lg:text-3xl">
                         Sorry, This Page is not available.
                    </h2>
                    <button
                         onClick={() => navigate("")}
                         className="mt-5 transition-all text-blue-600 hover:text-blue-800"
                    >
                         Go to Home <FaArrowRightLong className="inline" />
                    </button>
               </motion.div>
          </div>
     );
};

export default ErrorPage;
