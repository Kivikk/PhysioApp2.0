import React from "react";
import { User } from "../../utils/icons";
import logo from "../../assets/logo.svg";

const Header = () => {
  return (
    <header className="bg-physio-safari/75 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="PhysioApp Logo"
              className="h-16 w-auto"
            />
            <h1 className="text-2xl font-bold text-physio-chocolate ml-3">PhysioApp</h1>
          </div>
          <button className="text-physio-chocolate hover:text-physio-cream transition-colors duration-200">

            <User className="h-5 w-5 text-physio-cream" />
            Login
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;