import { useNavigate } from "react-router-dom";
import AboutUsImg from "./AboutUsImg";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";

const AboutUsPage = () => {
     const navigate = useNavigate();
     return (
          <motion.div
               animate={{ y: [200, 0], opacity: [0, 1] }}
               transition={{ type: "tween", duration: 0.4 }}
               className="text-gray-900 w-full min-h-screen grid grid-cols-1 md:grid-cols-3 justify-center items-center px-6 md:px-16 lg:px-60 py-6 lg:py-32"
          >
               <AboutUsImg />
               <p className="text-gray-900 font-semibold md:col-span-2">
                    Hey, I am{" "}
                    <span className="text-blue-600">Bavly Ashraf</span>, a{" "}
                    <span className="text-blue-600">
                         Frontend Web Developer
                    </span>{" "}
                    and lifelong learner with a professional background in{" "}
                    <span className="text-blue-600">HTML</span>,{" "}
                    <span className="text-blue-600">CSS</span>,{" "}
                    <span className="text-blue-600">JavaScript</span>,{" "}
                    <span className="text-blue-600">TypeScript</span>,{" "}
                    <span className="text-blue-600">React Js</span>, and{" "}
                    <span className="text-blue-600">Angular</span>. I enjoy
                    development because of the satisfaction I get by overcoming
                    challenges. I work on writing high-quality and clean code.
                    Continually I enhance applications while participating in
                    code reviews. My passion for creating visually appealing and
                    user-friendly interfaces drives me to constantly improve my
                    skills and stay up-to-date with the latest trends and
                    technologies in front-end development. Also, I have a great
                    background in graphic designing and designing software.
                    <span className="text-sm block font-normal my-4 text-gray-800">
                         Skills and Technologies: HTML/CSS | JavaScript | React
                         Js | Redux | Angular | MUI | Postman | Git | GitHub |
                         Jira | OOP Adobe Photoshop | Adobe Illustrator | Adobe
                         InDesign | Adobe AfterEffects | Adobe XD | Figma
                    </span>
                    <span
                         role="button"
                         onClick={() => {
                              navigate("/contact");
                         }}
                         className="text-blue-600 hover:text-blue-800 transition-all block text-center"
                    >
                         Contact us <FaArrowRightLong className="inline" />
                    </span>
               </p>
          </motion.div>
     );
};

export default AboutUsPage;
