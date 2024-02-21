import { useNavigate } from "react-router-dom";
import AboutUsPage from "../components/about-us-page/aboutUsPage";
import NavBar from "../components/home-components/NavBar";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const AboutUs = () => {
     const navigate = useNavigate();
     const userAuth = useSelector((state) => state.auth.isUserAuthenticated);
     const appIsLoading = useSelector((state) => state.auth.appIsLoading);

     useEffect(() => {
          document.title = "Doit | About Us";
     }, []);

     useEffect(() => {
          if (userAuth && !appIsLoading) {
               navigate("/app/today");
          }
     }, [appIsLoading, navigate, userAuth]);

     return (
          <div className="bg-gray-50">
               <NavBar />
               <AboutUsPage />
          </div>
     );
};

export default AboutUs;
