import { useNavigate } from "react-router-dom";
import AboutUsPage from "../components/about-us-page/AboutUsPage";
import NavBar from "../components/home-components/NavBar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../store";

const AboutUs = () => {
     const navigate = useNavigate();
     const userAuth = useSelector((state: RootState) => state.auth.isUserAuthenticated);
     const appIsLoading = useSelector((state: RootState) => state.auth.appIsLoading);

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
