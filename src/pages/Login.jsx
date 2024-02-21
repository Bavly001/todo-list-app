import { useEffect } from "react";
import LoginForm from "../components/home-components/LoginForm";
import NavBar from "../components/home-components/NavBar";

const Login = () => {

     useEffect(() => {
          document.title = "Doit | Login";
     }, []);

     return (
          <div className="text-gray-900 w-full min-h-screen flex flex-col items-center bg-gray-50">
               <NavBar />
               <LoginForm />
          </div>
     );
};

export default Login;
