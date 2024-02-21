import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../../store/theme/theme-slice";
import ThemeButton from "./ThemeButton";

const ColorThemeSection = () => {
     const dispatch = useDispatch();

     const currentColor = useSelector((state) => state.theme.color.mainColor);
     

     return (
          <div>
               <h1 className="dark:text-gray-100">Color mode</h1>
               <div
                    className="flex gap-x-10 gap-y-6 my-3 flex-wrap"
               >
                    <ThemeButton
                         bgColor="bg-blue-600 dark:bg-blue-400"
                         borderColor="border-blue-600 dark:border-blue-400"
                         active={currentColor === "blue"}
                         onClick={() =>
                              dispatch(themeActions.changeColorBlue())
                         }
                    />
                    <ThemeButton
                         bgColor="bg-cyan-600 dark:bg-cyan-400"
                         borderColor="border-cyan-600 dark:border-cyan-400"
                         active={currentColor === "cyan"}
                         onClick={() =>
                              dispatch(themeActions.changeColorCyan())
                         }
                    />
                    <ThemeButton
                         bgColor="bg-teal-600 dark:bg-teal-400"
                         borderColor="border-teal-600 dark:border-teal-400"
                         active={currentColor === "teal"}
                         onClick={() =>
                              dispatch(themeActions.changeColorTeal())
                         }
                    />
                    <ThemeButton
                         bgColor="bg-green-600 dark:bg-green-400"
                         borderColor="border-green-600 dark:border-green-400"
                         active={currentColor === "green"}
                         onClick={() =>
                              dispatch(themeActions.changeColorGreen())
                         }
                         index={3}
                    />
                    <ThemeButton
                         bgColor="bg-lime-600 dark:bg-lime-400"
                         borderColor="border-lime-600 dark:border-lime-400"
                         active={currentColor === "lime"}
                         onClick={() =>
                              dispatch(themeActions.changeColorLime())
                         }
                         index={4}
                    />
                    <ThemeButton
                         bgColor="bg-orange-600 dark:bg-orange-400"
                         borderColor="border-orange-600 dark:border-orange-400"
                         active={currentColor === "orange"}
                         onClick={() =>
                              dispatch(themeActions.changeColorOrange())
                         }
                         index={5}
                    />
                    <ThemeButton
                         bgColor="bg-pink-600 dark:bg-pink-400"
                         borderColor="border-pink-600 dark:border-pink-400"
                         active={currentColor === "pink"}
                         onClick={() =>
                              dispatch(themeActions.changeColorPink())
                         }
                         index={6}
                    />
                    <ThemeButton
                         bgColor="bg-purple-600 dark:bg-purple-400"
                         borderColor="border-purple-600 dark:border-purple-400"
                         active={currentColor === "purple"}
                         onClick={() =>
                              dispatch(themeActions.changeColorPurple())
                         }
                         index={7}
                    />
               </div>
          </div>
     );
};

export default ColorThemeSection;
