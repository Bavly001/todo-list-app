import { useEffect } from "react";
import ContactUsPage from "../components/contact-components/ContactUsPage";
import NavBar from "../components/home-components/NavBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
     const navigate = useNavigate();
     const userAuth = useSelector((state) => state.auth.isUserAuthenticated);
     const appIsLoading = useSelector((state) => state.auth.appIsLoading);

     
     useEffect(() => {
          document.title = "Doit | Contact";
     }, []);

     useEffect(() => {
          if (userAuth && !appIsLoading) {
               navigate("/app/today");
          }
     }, [appIsLoading, navigate, userAuth]);

     return (
          <div className="text-gray-900 w-full min-h-screen flex flex-col items-center justify-center bg-gray-50">
               <NavBar />
               <ContactUsPage />
          </div>
     );
};

export default ContactUs;
