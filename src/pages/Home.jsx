import { useEffect } from "react";
import Header from "../components/home-components/Header";
import TipsSection from "../components/home-components/TipsSection";
import NavBar from "../components/home-components/NavBar";
import AnimatedSection from "../components/home-components/AnimatedSection";
import EndSection from "../components/home-components/EndSection";
import Footer from "../components/home-components/Footer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
     const navigate = useNavigate();
     const userAuth = useSelector((state) => state.auth.isUserAuthenticated);
     const appIsLoading = useSelector((state) => state.auth.appIsLoading);

     useEffect(() => {
          window.scrollTo({ top: 0, left: 0 });
          document.title = "Doit | Home";

     }, []);
     useEffect(() => {
          if (userAuth && !appIsLoading) {
               navigate("/app/today");
          }
     }, [appIsLoading, navigate, userAuth]);

     return (
          <div className="text-gray-900 w-full min-h-screen flex flex-col items-center bg-gray-50">
               <NavBar />
               <Header />
               <TipsSection />
               <AnimatedSection />
               <EndSection />
               <Footer />
          </div>
     );
};

export default Home;
