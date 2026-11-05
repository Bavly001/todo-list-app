import HomeSectionContainer from "./HomeSectionContainer";
import { RxLapTimer } from "react-icons/rx";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";

const TipsSection = () => {
     const sectionData = [
          {
               title: "Focus on what’s important",
               paragraph: `Remind yourself of your long-term goals
                 and revise them when necessary.
                 Set daily priorities to meet your goals.
                 Keep photos of your family or inspirational pictures nearby.`,
          },
          {
               title: "Make lists",
               paragraph: `Make daily, weekly and monthly to-do lists of important tasks.  Review your daily priorities at the beginning of each day.`,
          },
          {
               title: "Manage your time well",
               paragraph: `Schedule quiet time at work to accomplish tasks that need extra concentration.  Do your most challenging work when your energy is at its highest; save less demanding work for other times. 
                 If you tend to procrastinate,
                  focus on the sense of accomplishment you’ll feel when the job is done.  Use commute time to plan your day’s activities.`,
          },
          {
               title: "Delegate tasks",
               paragraph: `Assign tasks to others when the task is not on your level of expertise.  Provide adequate training and feedback on assigned projects.`,
          },
          {
               title: "Stay organized",
               paragraph: `Organize files by priority and keep the most important ones within arm’s reach. 
                 Spend 15 minutes at the end of each day clearing your desk and 15 minutes the next morning planning for your day’s activities. 
                 Review items one through seven on this list.`,
          },
     ];
     return (
          <HomeSectionContainer className="pt-3">
               <div>
                    <h1 className="text-2xl mx-12 lg:text-7xl font-bold mt-2 lg:mt-5 mb-14 lg:mb-20 text-center">
                         Here are{" "}
                         <span className="text-blue-600">
                              {sectionData.length}
                         </span>{" "}
                         tips that will help you to arrange your life{" "}
                         <span className="text-blue-600 inline-flex self-center align-middle">
                              <RxLapTimer className="rotate-12" />
                         </span>
                    </h1>
                    <ol className="list-decimal mx-12 sm:mx-20 md:mx-24 lg:mx-28 md:grid md:grid-cols-2 md:gap-x-14">
                         {sectionData.map((item, index) => (
                              <motion.li
                                   variants={{
                                        hidden: {
                                             x: index % 2 === 0 ? -5000 : 5000,
                                             opacity: 0,
                                        },
                                        visible: {
                                             x: 0,
                                             opacity: 1,
                                             transition: {
                                                  type: "tween",
                                             },
                                        },
                                   }}
                                   key={item.paragraph}
                                   className="text-xl lg:text-3xl font-bold text-blue-600 mb-6"
                              >
                                   {item.title.split(" ")[0]}
                                   <span className="text-lg lg:text-2xl text-gray-900">
                                        {" " +
                                             item.title
                                                  .split(" ")
                                                  .slice(1)
                                                  .join(" ")}
                                        :
                                   </span>
                                   <p className="mt-2 me-8 text-sm lg:text-xl font-light text-gray-600">
                                        {item.paragraph}
                                   </p>
                              </motion.li>
                         ))}
                    </ol>
               </div>

               <h1 className="w-full flex justify-center items-center mt-32">
                    Explore more about our app
                    <motion.span
                         animate={{ y: [2, -2, 2] }}
                         transition={{ repeat: Infinity }}
                    >
                         <IoIosArrowDown className="mt-1.5 ms-0.5 text-xs lg:text-sm" />
                    </motion.span>
               </h1>
          </HomeSectionContainer>
     );
};

export default TipsSection;
