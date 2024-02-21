import { useDispatch, useSelector } from "react-redux";
import ThemeButton from "./ThemeButton";
import { themeActions } from "../../store/theme/theme-slice";

const ModeThemeSection = () => {
     const dispatch = useDispatch();
     const theme = useSelector((state) => state.theme.mode);

     return (
          <div>
               <h1>Theme mode</h1>
               <div className="flex gap-x-10 my-3 flex-wrap">
                    <ThemeButton
                         bgColor="bg-white"
                         borderColor="border-white"
                         active={theme !== "dark"}
                         onClick={() =>
                              dispatch(themeActions.changeThemeMode(""))
                         }
                         // index={0}
                    />
                    <ThemeButton
                         bgColor="bg-gray-700"
                         borderColor="border-gray-700"
                         active={theme === "dark"}
                         onClick={() =>
                              dispatch(themeActions.changeThemeMode("dark"))
                         }
                         // index={1}
                    />
               </div>
          </div>
     );
};

export default ModeThemeSection;
