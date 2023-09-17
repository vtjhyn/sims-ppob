import React from "react";
import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex flex-row gap-[6.5px] justify-center items-center cursor-pointer"
    >
      <img src={logo} alt="Logo" width={18} height={18} />
      <div className="font-semibold text-sm">SIMS PPOB - VEBBY TJAHYONO</div>
    </Link>
  );
};

export default Logo;
