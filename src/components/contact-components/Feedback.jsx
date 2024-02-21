import { motion } from "framer-motion";
import { useFormik } from "formik";
import { VscFeedback } from "react-icons/vsc";
import * as Yup from "yup";
import { submitFeedback } from "../../store/feedback/feedback-action";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import { longDateFormatAndTime } from "../../utils/dateFormatter";

const Feedback = () => {
     const feedbackStatus = useSelector((state) => state.feedback);
     const dispatch = useDispatch();

     const formik = useFormik({
          initialValues: {
               firstName: "",
               lastName: "",
               email: "",
               message: "",
          },
          validationSchema: Yup.object({
               firstName: Yup.string().required("Required"),
               lastName: Yup.string().required("Required"),
               email: Yup.string()
                    .email("Invalid email address")
                    .required("Required"),
               message: Yup.string().required("Required"),
          }),
          onSubmit: (values) => {
               dispatch(
                    submitFeedback({
                         ...values,
                         dateAndTime: longDateFormatAndTime(new Date()),
                    })
               );
          },
     });
     return (
          <div className="w-full h-full md:col-span-2 relative">
               {feedbackStatus.succeeded && !feedbackStatus.loading && (
                    <motion.div
                         initial={{ opacity: 0, y: 100 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ type: "tween" }}
                         className="absolute w-full h-[105%] px-6 md:px-16 py-2 md:py-0 left-0"
                    >
                         <div className="w-full h-full bg-black bg-opacity-80 backdrop-blur-sm rounded-3xl shadow-md flex flex-col justify-center items-center text-gray-50 text-center px-5">
                              <VscFeedback className="text-8xl" />
                              <p className="font-bold text-sm sm:text-lg">
                                   Thank you so much for your feedback.
                              </p>
                              <p className="font-light text-sm sm:text-base">
                                   Your feedback submitted successfully!
                              </p>
                         </div>
                    </motion.div>
               )}
               <div className="px-6 md:px-16 py-5 md:py-8">
                    <div className="mb-4 lg:mb-10 text-center md:text-start">
                         <h2 className="text-3xl font-bold">
                              Send Us Your Feedback
                         </h2>
                         {feedbackStatus.error && !feedbackStatus.loading && (
                              <p className="text-blue-600 text-xs md:text-base">
                                   Sorry, Something went wrong! Please, Try
                                   again later.
                              </p>
                         )}
                    </div>
                    <form
                         onSubmit={formik.handleSubmit}
                         className="w-full min-h-full flex flex-col items-center gap-y-4"
                    >
                         <div className="flex w-full gap-x-7">
                              <div className="w-full">
                                   <label className="block text-gray-600 font-medium">
                                        <span className="text-blue-500">*</span>
                                        First Name
                                   </label>
                                   <input
                                        autoComplete="off"
                                        type="text"
                                        name="firstName"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                        {...formik.getFieldProps("firstName")}
                                        placeholder={
                                             formik.touched.firstName &&
                                             formik.errors.firstName &&
                                             formik.errors.firstName
                                        }
                                   />
                              </div>
                              <div className="w-full">
                                   <label className="block text-gray-600 font-medium">
                                        <span className="text-blue-500">*</span>
                                        Last Name
                                   </label>
                                   <input
                                        autoComplete="off"
                                        type="text"
                                        name="lastName"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                        {...formik.getFieldProps("lastName")}
                                        placeholder={
                                             formik.touched.lastName &&
                                             formik.errors.lastName &&
                                             formik.errors.lastName
                                        }
                                   />
                              </div>
                         </div>
                         <div className="w-full">
                              <label className="block text-gray-600 font-medium">
                                   <span className="text-blue-500">*</span>
                                   Email
                                   {formik.errors.email ===
                                        "Invalid email address" &&
                                        formik.touched.email && (
                                             <span className="text-xs text-blue-500">
                                                  {" "}
                                                  ({formik.errors.email})
                                             </span>
                                        )}
                              </label>
                              <input
                                   autoComplete="off"
                                   type="text"
                                   name="email"
                                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                   {...formik.getFieldProps("email")}
                                   placeholder={
                                        formik.touched.email &&
                                        formik.errors.email &&
                                        formik.errors.email
                                   }
                              />
                         </div>
                         <div className="w-full">
                              <label className="block text-gray-600 font-medium">
                                   <span className="text-blue-500">*</span>
                                   Message
                              </label>
                              <textarea
                                   autoComplete="off"
                                   type="text"
                                   name="message"
                                   className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-600 h-32 resize-none"
                                   {...formik.getFieldProps("message")}
                                   placeholder={
                                        formik.touched.message &&
                                        formik.errors.message &&
                                        formik.errors.message
                                   }
                              />
                         </div>
                         <button
                              type="submit"
                              className="bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none transition-all w-1/2 disabled:hover:bg-blue-600 hover:bg-blue-800"
                              disabled={feedbackStatus.loading}
                         >
                              {feedbackStatus.loading ? (
                                   <Loader className="h-4 aspect-square text-gray-50" />
                              ) : (
                                   "Submit"
                              )}
                         </button>
                    </form>
               </div>
          </div>
     );
};

export default Feedback;
