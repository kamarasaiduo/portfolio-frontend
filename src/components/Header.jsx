import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

const navLinkClass = ({ isActive }) => {
  // Active tab styles
  if (isActive) {
    return "px-3 py-2 rounded-md transition-all duration-300 font-semibold underline bg-blue-50 text-blue-600 border-b-2 border-blue-600 dark:bg-blue-900 dark:text-blue-400 dark:border-blue-400";
  }
  
  // Inactive tab styles
  return "px-3 py-2 rounded-md transition-all duration-300 font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-900 opacity-90 hover:opacity-100";
};

export default function Header() {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check current theme on component mount
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  function handleLogout() {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="border-b text-white bg-blue-600 dark:bg-blue-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-amber-300 font-bold text-xl">
          MyPortfolio: <span className="text-white">Saidu O. Kamara</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/" className={navLinkClass} end>Home</NavLink>
          <NavLink to="/services" className={navLinkClass}>Services</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>

          {isAuthenticated ? (
            <>
              {isAdmin && (
                <NavLink to="/admin/users" className={navLinkClass}>Admin</NavLink>
              )}
              <NavLink to="/profile" className={navLinkClass}>Profile</NavLink>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm bg-red-600 text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass}>Login</NavLink>
              <NavLink to="/register" className={navLinkClass}>Register</NavLink>
            </>
          )}
          
          {/* Theme Toggle Button - Last in desktop navigation */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-900 transition"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-blue-300" />
            )}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button 
            className="p-2"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Positioned 200px from right */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-16 right-0 w-[calc(100vw-200px)] h-[calc(100vh-64px)] bg-blue-700 dark:bg-blue-900 transition-colors duration-300 z-40">
          <nav className="flex flex-col space-y-4 p-6 h-full">
            <NavLink to="/" className={navLinkClass} onClick={toggleMenu}>Home</NavLink>
            <NavLink to="/services" className={navLinkClass} onClick={toggleMenu}>Services</NavLink>
            <NavLink to="/contact" className={navLinkClass} onClick={toggleMenu}>Contact</NavLink>

            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <NavLink to="/admin/users" className={navLinkClass} onClick={toggleMenu}>Admin</NavLink>
                )}
                <NavLink to="/profile" className={navLinkClass} onClick={toggleMenu}>Profile</NavLink>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm bg-red-600 text-white hover:bg-red-700 transition text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={navLinkClass} onClick={toggleMenu}>Login</NavLink>
                <NavLink to="/register" className={navLinkClass} onClick={toggleMenu}>Register</NavLink>
              </>
            )}
            
            {/* Theme Toggle Button - Last in mobile navigation */}
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-white hover:bg-blue-600 dark:hover:bg-blue-800 transition text-left mt-auto"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-yellow-400" />
                  Switch to Light Mode
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-blue-300" />
                  Switch to Dark Mode
                </>
              )}
            </button>
          </nav>
        </div>
      )}

      {/* Overlay to close menu when clicking outside */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleMenu}
        />
      )}
    </header>
  );
}