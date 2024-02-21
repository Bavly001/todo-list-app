import { BiDockLeft } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { drawerActions } from "../../store/drawer-slice";

const DrawerButton = ({ className = "" }) => {
     const dispatch = useDispatch();
     return (
          <button
               className={`bg-transparent flex items-center justify-center p-2 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 ${className}`}
               onClick={() => dispatch(drawerActions.drawerToggle())}
          >
               <BiDockLeft className=" text-xl" />
          </button>
     );
};

export default DrawerButton;
