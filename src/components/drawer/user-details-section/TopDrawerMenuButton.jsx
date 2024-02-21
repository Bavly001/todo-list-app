const TopDrawerMenuButton = ({
     Icon,
     className = "",
     buttonText,
     ...props
}) => {
     return (
          <button
               type="button"
               className={
                    "w-full py-2 px-5 hover:bg-gray-200 dark:hover:bg-gray-900 flex items-center " +
                    className
               }
               {...props}
          >
               <Icon className="mx-2 text-bold text-lg" />
               <span>{buttonText}</span>
          </button>
     );
};

export default TopDrawerMenuButton;
