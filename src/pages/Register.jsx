import { useNavigate } from "react-router-dom";
import NavBar from "../components/home-components/NavBar";
import { useEffect } from "react";

const Register = () => {
     const navigate = useNavigate();

     useEffect(() => {
          document.title = "Doit | Register";
     }, []);

     return (
          <div className="text-gray-900 w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-52 py-24 bg-gray-50 text-center gap-y-2 sm:gap-y-10">
               <NavBar />
               <h1 className="text-xl md:text-3xl lg:text-5xl font-bold">
                    Sorry, You can not create an account here because of reduced
                    storage availability.
               </h1>
               <p className="text-lg md:text-2xl font-bold text-blue-600">
                    Thanks for understanding!
               </p>
               <p className="text-base md:text-xl flex flex-col">
                    You can use this account as a trial:
                    <span className="text-base mt-2">
                         Email:
                         <span className="text-blue-600 ms-1 font-semibold">
                              user@doit.com
                         </span>
                    </span>
                    <span className="text-base">
                         Password:
                         <span className="text-blue-600 ms-1 font-semibold">
                              user@password
                         </span>
                    </span>
               </p>
               <button
                    className="bg-blue-600 hover:bg-blue-800 transition-all py-2 px-12 text-gray-50 rounded-md"
                    onClick={() => {
                         navigate("/login", {
                              state: {
                                   email: "user@doit.com",
                                   password: "user@password",
                              },
                         });
                    }}
               >
                    Login Now
               </button>
          </div>
     );
};

export default Register;
