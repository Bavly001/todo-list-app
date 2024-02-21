import { useLocation, useNavigate } from "react-router-dom";
import HomeSectionContainer from "./HomeSectionContainer";
import { useFormik } from "formik";
import * as yup from "yup";
import { getUser } from "../../store/auth/auth-actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserToken } from "../../utils/userAuth";
import Loader from "../Loader";

const LoginForm = () => {
     const dispatch = useDispatch();
     const authData = useSelector((state) => state.auth);
     const { state } = useLocation();

     const initialValues = state ?? { email: "", password: "" };

     const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
          useFormik({
               initialValues,
               onSubmit: (values) => {
                    dispatch(getUser(values));
               },
               validationSchema: yup.object().shape({
                    email: yup
                         .string()
                         .email("Please, Enter a valid email.")
                         .required("Please, Enter your email."),
                    password: yup
                         .string()
                         .required("Please, Enter your password.")
                         .min(9, "Please, Enter a valid password."),
               }),
          });

     const userAuth = getUserToken();

     const navigate = useNavigate();
     // const userAuth = useSelector((state) => state.auth.isUserAuthenticated);
     const appIsLoading = useSelector((state) => state.auth.appIsLoading);

     useEffect(() => {
          if (userAuth && !appIsLoading) {
               navigate("/app/today");
          }
     }, [appIsLoading, navigate, userAuth]);


     return (
          <HomeSectionContainer className="justify-center items-center py-8 px-1">
               <form
                    onSubmit={handleSubmit}
                    className="border-2 rounded-lg pb-16 pt-7 md:pb-24 md:pt-16 px-12 flex flex-col justify-center items-center gap-y-10 w-11/12 md:w-auto mt-16"
               >
                    <div className="mb-4 md:mb-10 text-center">
                         <h1 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">
                              Login to Your Account
                         </h1>
                         {authData.error && (
                              <small className="text-blue-600">
                                   Something went wrong, Please Try Again Later.
                              </small>
                         )}
                    </div>
                    <div className="w-full">
                         <input
                              autoFocus={values.email === ""}
                              type="email"
                              name="email"
                              value={values.email}
                              placeholder="E-mail"
                              className="text-sm md:text-base ps-2 pb-1 w-full bg-transparent border-b"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              autoComplete="off"
                         />
                         {touched.email && errors.email && (
                              <small className="text-blue-600 mt-1">
                                   {errors.email}
                              </small>
                         )}
                    </div>
                    <div className="w-full">
                         <input
                              type="password"
                              name="password"
                              value={values.password}
                              placeholder="Password"
                              className="text-sm md:text-base ps-2 pb-1 w-full bg-transparent border-b"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              autoComplete="off"
                         />
                         {touched.password && errors.password && (
                              <small className="text-blue-600 mt-1">
                                   {errors.password}
                              </small>
                         )}
                         {authData.failed && (
                              <p className="text-blue-600 mt-5 text-sm text-center w-full">
                                   Your email address or password not valid
                              </p>
                         )}
                    </div>
                    <button
                         type="submit"
                         disabled={
                              authData.loading ||
                              authData.error ||
                              authData.isUserAuthenticated
                         }
                         className="text-sm md:text-base bg-blue-600 text-gray-50 px-3 py-1 lg:px-5 lg:py-1.5 rounded-md w-2/3 disabled:hover:bg-blue-600 hover:bg-blue-800 transition-all"
                    >
                         {authData.loading || authData.isUserAuthenticated ? (
                              <Loader className="h-4 aspect-square text-gray-50" />
                         ) : (
                              "Login"
                         )}
                    </button>

                    <p className="text-sm md:text-base">
                         Do not have an account?
                         <button
                              type="button"
                              onClick={() => navigate("/register")}
                              className="ms-1 md:ms-2 text-gray-400 transition-all hover:text-gray-600 hover:underline"
                         >
                              Join us now
                         </button>
                    </p>
               </form>
          </HomeSectionContainer>
     );
};

export default LoginForm;
