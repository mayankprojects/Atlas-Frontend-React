import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../images/ahalogo.png";

const Navbar = ({ onLogout, userRole }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div className="bg-red-400 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="AHA Atlas Logo" className="h-14" />
          <h1 className="text-3xl font-bold text-white">Atlas</h1>
          {userRole === 'admin' && (
            <span className="bg-white text-red-600 text-sm font-bold px-2 py-1 rounded-full">
              Admin
            </span>
          )}
        </div>
        <div className="space-x-8">
          <button 
            onClick={() => navigate("/")} 
            className="text-white hover:text-gray-200 font-medium text-lg"
          >
            Home
          </button>
          {userRole === 'admin' && (
            <button 
              onClick={() => navigate("/addAtlas")} 
              className="text-white hover:text-gray-200 font-medium text-lg"
            >
              Add Class
            </button>
          )}
          <button 
            onClick={handleLogout} 
            className="text-white hover:text-gray-200 font-medium text-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
