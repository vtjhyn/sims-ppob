import React from "react";
import Container from "./Container";
import Logo from "./Logo";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed z-10 w-full top-0 border-b-[1px] py-[18.5px] bg-white">
      <Container>
        <div className="flex flex-row w-full items-center justify-between">
          <Logo />
          <div className="flex flex-row gap-[50px] font-semibold text-sm">
            <NavLink
              to="/topup"
              className={({ isActive }) => (isActive ? "text-[#f42619]" : "")}
            >
              Top Up
            </NavLink>
            <NavLink
              to="/transaction"
              className={({ isActive }) => (isActive ? "text-[#f42619]" : "")}
            >
              Transaction
            </NavLink>
            <NavLink
              to="/akun"
              className={({ isActive }) => (isActive ? "text-[#f42619]" : "")}
            >
              Akun
            </NavLink>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
