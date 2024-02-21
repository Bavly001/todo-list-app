import ContactInfo from "./ContactInfo";
import Feedback from "./Feedback";
import { motion } from "framer-motion";

const ContactUsPage = () => {
     return (
          <motion.div
               animate={{ y: [100, 0], opacity: [0, 1] }}
               transition={{ type: "tween", duration: 0.4 }}
               className="h-full w-full flex flex-col py-16 lg:pt-20 text-gray-950 overflow-x-hidden"
          >
               <div className="h-1/5 flex flex-col justify-center items-center px-6">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                         Contact Us
                    </h2>
                    <p className="text-xs md:text-base text-blue-600 max-w-56 sm:max-w-fit text-center md:text-start">
                         Feel free to contact us and we will get back to you as
                         soon as we can.
                    </p>
               </div>
               <div className="h-4/5 grid pt-5 lg:pt-5 md:grid-cols-3">
                    <ContactInfo />
                    <Feedback />
               </div>
          </motion.div>
     );
};

export default ContactUsPage;
