// src/components/layout/Header.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Heart } from "../../utils/icons";
import { useFavorites } from "../../hooks/useFavorites";
import logo from "../../assets/logo.svg";

const Header = () => {
  const navigate = useNavigate();
  const { favorites, getFavoriteCount } = useFavorites();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const currentCount = Object.keys(favorites).length;
    setCount(currentCount);
  }, [favorites]);

  return (
    <header className="bg-physio-safari/75 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <img
              src={logo}
              alt="PhysioApp Logo"
              className="h-16 w-auto"
            />
            <h1 className="text-2xl font-bold text-physio-chocolate ml-3">
              PhysioApp
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/favorites')}
              className="text-physio-chocolate hover:text-physio-cream transition-colors duration-200 relative"
              aria-label="Favoriten"
            >
              <Heart className="h-5 w-5 text-physio-cream" />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-physio-terrakotta text-white 
                              text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>

            <button className="text-physio-chocolate hover:text-physio-cream transition-colors duration-200 flex items-center gap-2">
              <User className="h-5 w-5 text-physio-cream" />
              <span>Login</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;