import React from "react";

export interface PageSectionProps {
  title?: string;
  className?: string;
  children?: React.ReactNode;
}

const PageSection: React.FC<PageSectionProps> = ({ children, className }) => {
  return (
    <div className={`h-full flex flex-col gap-5 w-[80%] py-12 mx-auto text-gray-800 dark:text-gray-200 overflow-x-hidden overflow-y-auto show-scrollbar ${className || ""}`}>
      {children}
    </div>
  );
};

export default PageSection;
