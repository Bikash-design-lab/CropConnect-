import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth"
const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/signin');
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-[var(--color-primary)] text-white px-4 py-3 shadow-lg">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight flex items-center"
          onClick={closeMenu}
        >
          <span className="bg-[var(--color-secondary)] text-[var(--color-primary)] px-2 py-1 rounded-lg shadow">
            Crop
          </span>
          <span className="text-white">Connect</span>
        </Link>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  menuOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </button>
        </div>

        <div
          className={`flex-col md:flex-row md:flex items-center gap-4 font-medium transition-all duration-300 ${menuOpen
            ? 'flex bg-[var(--color-primary)] absolute top-16 left-0 w-full p-4 shadow-xl'
            : 'hidden md:flex static w-auto p-0 shadow-none'
            }`}
        >
          {!user && (
            <>
              <Link to="/signin" onClick={closeMenu} className="text-white hover:underline hover:decoration-blue-500 transition-colors">
                Sign In
              </Link>
              <Link to="/signup" onClick={closeMenu} className="text-white hover:underline hover:decoration-blue-500 transition-colors">
                Sign Up
              </Link>
              <Link to="/contact-us" onClick={closeMenu} className="text-white hover:underline hover:decoration-blue-500 transition-colors">
                Contact Us
              </Link>
            </>
          )}

          {user?.role === 'farmer' && (
            <>
              <Link to="/dashboard/farmer" onClick={closeMenu} className="text-white hover:underline hover:decoration-blue-500 transition-colors">
                Farmer Dashboard
              </Link>
              <Link to="/profile/farmer" onClick={closeMenu} className="text-white hover:underline hover:decoration-blue-500 transition-colors">
                My Profile
              </Link>
            </>
          )}

          {user?.role === 'buyer' && (
            <>
              <Link to="/dashboard/buyer" onClick={closeMenu} className="text-white hover:underline hover:decoration-blue-500 transition-colors">
                Buyer Dashboard
              </Link>
              <Link to="/profile/buyer" onClick={closeMenu} className="text-white hover:underline hover:decoration-blue-500 transition-colors">
                My Profile
              </Link>
            </>
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="bg-yellow-500 text-white ml-0 md:ml-4 px-4 py-2 rounded-lg font-bold shadow hover:underline hover:decoration-blue-500"
              disabled={loading}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

