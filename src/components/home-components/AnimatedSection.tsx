import { motion, useScroll, useTransform } from "framer-motion";
import HomeSectionContainer from "./HomeSectionContainer";
import setDueDate from "../../assets/set_due_date.svg";
import addProject from "../../assets/add_project.svg";
import addTask from "../../assets/add_task.svg";
import success from "../../assets/success.svg";

const sectionComponents = [
     {
          title: "Start adding your tasks",
          text: `Instead of thinking an 8-, 6-, or 10-hour workday, split your day into four or five 90-minute windows. 
     That way, you will have on average 4 tasks.`,
          img: addTask,
     },
     {
          title: "Set due date",
          text: `Use due dates to keep track of important tasks and project deadlines so you can achieve more tasks.`,
          img: setDueDate,
     },
     {
          title: "Manage a project",
          text: `Make your project tasks clearer and organized by splitting them into small tasks and tracking each task's due date.`,
          img: addProject,
     },
     {
          title: "Reach your goal",
          text: `Now you arrange your life, your time, your tasks and your progress also you will achieve more and more so we can reach success together.`,
          img: success,
     },
];

const AnimatedSection = () => {
     const { scrollYProgress } = useScroll();
     const x = useTransform(scrollYProgress, [0.35, 0.8], ["0%", "-300%"]);
     const sectionStyles = {
          scale: useTransform(scrollYProgress, [0.3, 0.31], [0, 1]),
          y: useTransform(scrollYProgress, [0.3, 0.31], [500, 0]),
          position: useTransform(scrollYProgress, (number) =>
               number > 0.3 && number < 0.9 ? "fixed" : "static"
          ),
          opacity: useTransform(
               scrollYProgress,
               [0.3, 0.31, 0.88, 0.9],
               [0, 1, 1, 0]
          ),
          borderRadius: useTransform(scrollYProgress, [0.3, 0.32], [20, 0]),
     };

     return (
          <HomeSectionContainer>
               <div className="h-[400vh] relative">
                    <motion.section
                         className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 shadow-lg w-full h-screen top-0 left-0 overflow-x-hidden"
                         style={sectionStyles}
                    >
                         <motion.div
                              style={{ x }}
                              className="h-full flex items-center"
                         >
                              {sectionComponents.map((section, index) => (
                                   <div
                                        key={section.title}
                                        className="min-w-full min-h-full flex flex-col md:flex-row items-center justify-center md:justify-between px-2 md:px-36 md:pt-0 md:gap-x-6"
                                   >
                                        <img
                                             draggable={false}
                                             src={section.img}
                                             className="w-4/5 md:w-2/5"
                                        />
                                        <div className="text-gray-50 w-full md:w-3/5 px-12">
                                             <h1 className="font-bold text-xl md:text-5xl mb-5">
                                                  {index + 1}. {section.title}
                                             </h1>
                                             <p>{section.text}</p>
                                        </div>
                                   </div>
                              ))}
                         </motion.div>
                    </motion.section>
               </div>
          </HomeSectionContainer>
     );
};

export default AnimatedSection;
