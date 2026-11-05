import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export interface LoadMoreProps {
  onClick: () => void;
}

const LoadMore: React.FC<LoadMoreProps> = ({ onClick }) => {
  const textColor = useSelector((state: RootState) => state.theme.color.textColor);

  return (
    <p
      onClick={onClick}
      role="button"
      className={`w-[96%] float-end py-4 border-b-2 border-gray-200 dark:border-gray-800 text-center hover:underline ${textColor}`}
    >
      Load More ...
    </p>
  );
};

export default LoadMore;
