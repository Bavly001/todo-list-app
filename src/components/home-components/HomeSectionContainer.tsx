import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
const HomeSectionContainer = ({ className = "", children }) => {
     const ref = useRef();
     const isInView = useInView(ref, { once: true });
     const mainControls = useAnimation();

     useEffect(() => {
          if (isInView) mainControls.start("visible");
     }, [isInView, mainControls]);

     return (
          <motion.div
               ref={ref}
               variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: {
                         opacity: 1,
                         y: 0,
                         transition: {
                              delay: 0.1,
                              type: "tween",
                              staggerChildren: 0.3,
                         },
                    },
               }}
               initial="hidden"
               animate={mainControls}
               transition={{ duration: 0.5, delay: 0.25 }}
               className={`flex flex-col overflow-x-hidden justify-center min-h-screen w-full ${className}`}
          >
               {children}
          </motion.div>
     );
};

export default HomeSectionContainer;
