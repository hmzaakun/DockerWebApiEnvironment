import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4 py-2">
        <ul className="flex justify-between items-center">
          <li>
            <Link to="/" className="text-white font-semibold text-lg">
              Accueil
            </Link>
          </li>
          <li>
            <Link to="/vehicle" className="text-white font-semibold text-lg">
              Véhicule
            </Link>
          </li>
          <li>
            <Link to="/carsitter" className="text-white font-semibold text-lg">
              Carsitter
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
