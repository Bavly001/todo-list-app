import { Link } from "react-router-dom";
import HomeSectionContainer from "./HomeSectionContainer";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";

const EndSection = () => {
     return (
          <HomeSectionContainer>
               <div className="flex flex-col justify-center items-center gap-8 text-center w-full px-7">
                    <h1 className="text-3xl md:text-5xl font-bold">
                         What are you waiting for join us now !
                    </h1>
                    <div className="italic text-gray-500 font-bold md:flex text-sm md:text-base">
                         <p>
                              <span className="inline-flex me-1 md:me-3">
                                   <ImQuotesLeft />
                              </span>
                              <span>
                                   Don’t Wait for Opportunity, Create it.
                              </span>
                              <span className="inline-flex mx-1 md:mx-3">
                                   <ImQuotesRight />
                              </span>
                         </p>
                         <small className="font-normal">
                              ― George Bernard Shaw
                         </small>
                    </div>
                    <Link
                         to="/register"
                         className="py-1 px-6 md:py-3 md:px-12 bg-blue-500 text-gray-50 font-bold md:text-xl rounded-lg"
                    >
                         Join us
                    </Link>
               </div>
          </HomeSectionContainer>
     );
};

export default EndSection;
