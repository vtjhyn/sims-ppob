import React from "react";

const Container = ({ children }) => {
  return (
    <div className="max-w-[2520px] mx-auto xl:px-[120px] md:px-16 sm:px-8 px-8">
      {children}
    </div>
  );
};

export default Container;
