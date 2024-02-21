import DrawerButton from "../DrawerButton";
import TopDrawerMenuList from "./TopDrawerMenuList";

const UserDetailsSection = () => {
     return (
          <div className=" w-full flex justify-between items-center">
               <TopDrawerMenuList />
               <DrawerButton />
          </div>
     );
};

export default UserDetailsSection;
