import { useSelector } from "react-redux";

const Loader = ({ className }) => {
     const colorTheme = useSelector((state) => state.theme.color);

     return (
          <div
               className={`inline-block mx-auto ${
                    className ?? "h-8 w-8"
               } animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] ${
                    colorTheme.textColor !== "" && !className
                         ? colorTheme.textColor
                         : "text-blue-600"
               } motion-reduce:animate-[spin_1.5s_linear_infinite]`}
               role="status"
          />
     );
};

export default Loader;
