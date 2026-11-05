import MainDrawerSection from "./MainDrawerSection";
import ProjectsSection from "./ProjectsSection";
import UserDetailsSection from "./user-details-section/UserDetailsSection";

const Drawer = () => {
     return (
          <div className="h-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3.5 flex flex-col items-start gap-3 overflow-y-auto show-scrollbar">
               <UserDetailsSection />
               <MainDrawerSection />
               <ProjectsSection />
          </div>
     );
};

export default Drawer;
