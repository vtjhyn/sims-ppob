import React from "react";

const Button = ({ label, disabled, onClick, type = "submit", bg }) => {
  return (
    <button
      className={`w-full disabled:bg-[#c6c0c0] disabled:cursor-not-allowed px-3 py-2 ${
        bg ? bg : "bg-[#f42619] text-white"
      } rounded-md  text-sm hover:opacity-80 transition`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {label}
    </button>
  );
};

export default Button;
