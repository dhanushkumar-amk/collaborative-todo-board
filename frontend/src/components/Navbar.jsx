// Navbar.jsx
import React from 'react';
import { MdChecklist } from 'react-icons/md';

const Navbar = ({ isLoggedIn, onLoginClick, onLogoutClick }) => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <div className="flex items-center space-x-2 text-green-600 text-xl font-bold">
        <MdChecklist className="text-2xl" />
        <span>ToDoList</span>
      </div>

      <div>
        {isLoggedIn ? (
          <button
            onClick={onLogoutClick}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={onLoginClick}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
