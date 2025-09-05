import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme }  from '../Theme/Theme';
import logo from '../../assets/logo1.jpg';
import About from '../../pages/AboutUs/Aboutus';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
   const { theme, toggleTheme } = useTheme();
  const navRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  
  const toggleDropdown = (menu) => {
    setDropdownOpen(dropdownOpen === menu ? null : menu);
  };

  const closeDropdown = () => {
    setDropdownOpen(null);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
        setDropdownOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDark = theme === 'dark';

  return (
    <nav
      ref={navRef}
      className={`
        fixed top-3 left-1/2 -translate-x-1/2 z-50
        w-[80%] max-w-8xl
        ${isDark ? 'bg-gray-900/95' : 'bg-white/95'}
        backdrop-blur-md
        ${isDark ? 'shadow-md shadow-white/10' : 'shadow-md shadow-black/10'}
        rounded-xl border
        ${isDark ? 'border-white/20' : 'border-black/10'}
        px-4 py-2
        transition-all duration-300
      `}
    >

      <div className="flex items-center justify-between px-4 py-3 md:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/About" className="block">
            <img 
              src={logo} 
              alt="Logo" 
              className="h-15 w-auto md:h-16 lg:h-30 transition-all duration-300 rounded-xl" 
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          
          {/* Services Dropdown */}
          <div className="relative group">
            <button
              onClick={() => toggleDropdown('services')}
              className={`
                flex items-center space-x-1 px-4 py-2 rounded-lg
                ${isDark ? 'text-gray-100 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}
                transition-colors duration-200 font-medium
              `}
            >
              <span>Services</span>
              <svg className="w-4 h-4 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Services Dropdown Menu */}
            {dropdownOpen === 'services' && (
              <div className={`
                absolute top-full left-0 mt-2 w-64
                ${isDark ? 'bg-gray-800/95' : 'bg-white/95'}
                backdrop-blur-lg rounded-xl
                ${isDark ? 'shadow-lg shadow-white/10' : 'shadow-lg shadow-black/10'}
                border ${isDark ? 'border-white/20' : 'border-black/10'}
                py-2 z-50
              `}>
                {[
                  { to: '/dashboard', label: 'AI Timetable' },
                  { to: '/planner', label: 'AI Planner' },
                  { to: '/organization', label: 'AI for Organization' },
                  { to: '/game', label: 'AI Game for Lazy Ones' },
                  { to: '/seating', label: 'AI Seating Planner' }
                ].map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={closeDropdown}
                    className={`
                      block px-4 py-3 text-sm font-medium
                      ${isDark ? 'text-gray-200 hover:text-blue-400 hover:bg-gray-700/50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}
                      transition-colors duration-200
                    `}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Regular Nav Items */}
          {[
            { to: '/pricing', label: 'Pricing' },
            { to: '/about', label: 'About' },
            { to: '/contactus', label: 'Contact' }
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`
                px-4 py-2 rounded-lg font-medium
                ${isDark ? 'text-gray-100 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}
                transition-colors duration-200
              `}
            >
              {item.label}
            </Link>
          ))}

          {/* Login Dropdown */}
          <div className="relative group">
            <button
              onClick={() => toggleDropdown('login')}
              className={`
                flex items-center space-x-1 px-4 py-2 rounded-lg
                ${isDark ? 'text-gray-100 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'}
                transition-colors duration-200 font-medium
              `}
            >
              <span>Login</span>
              <svg className="w-4 h-4 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Login Dropdown Menu */}
            {dropdownOpen === 'login' && (
              <div className={`
                absolute top-full right-0 mt-2 w-48
                ${isDark ? 'bg-gray-800/95' : 'bg-white/95'}
                backdrop-blur-lg rounded-xl
                ${isDark ? 'shadow-lg shadow-white/10' : 'shadow-lg shadow-black/10'}
                border ${isDark ? 'border-white/20' : 'border-black/10'}
                py-2 z-50
              `}>
                {[
                  { to: '/LoginPer', label: 'Personal' },
                  { to: '/Loginad', label: 'Organization' }
                ].map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={closeDropdown}
                    className={`
                      block px-4 py-3 text-sm font-medium
                      ${isDark ? 'text-gray-200 hover:text-blue-400 hover:bg-gray-700/50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}
                      transition-colors duration-200
                    `}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-4">
          
          {/* Theme Toggle */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={theme === 'dark'}
              onChange={toggleTheme}
              className="sr-only"
            />
            <div className={`
              relative w-14 h-7 rounded-full transition-colors duration-300
              ${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'}
            `}>
              <div className={`
                absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full
                transition-transform duration-300 ease-in-out
                ${theme === 'dark' ? 'translate-x-7' : 'translate-x-0'}
              `}>
                {theme === 'dark' ? (
                  <svg className="w-4 h-4 text-blue-600 m-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-yellow-500 m-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
          </label>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className={`
              lg:hidden p-2 rounded-lg
              ${isDark ? 'text-gray-100 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}
              transition-colors duration-200
            `}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={`
          lg:hidden border-t ${isDark ? 'border-white/20' : 'border-black/10'}
          ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-lg
          rounded-b-2xl
        `}>
          <div className="px-4 py-6 space-y-4">
            
            {/* Mobile Services */}
            <div>
              <button
                onClick={() => toggleDropdown('services')}
                className={`
                  flex items-center justify-between w-full px-4 py-3 text-left
                  ${isDark ? 'text-gray-100' : 'text-gray-700'}
                  font-medium text-lg
                `}
              >
                Services
                <svg 
                  className={`w-5 h-5 transition-transform duration-200 ${dropdownOpen === 'services' ? 'rotate-180' : ''}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {dropdownOpen === 'services' && (
                <div className="ml-4 mt-2 space-y-2">
                  {[
                    { to: '/dashboard', label: 'AI Timetable' },
                    { to: '/planner', label: 'AI Planner' },
                    { to: '/organization', label: 'AI for Organization' },
                    { to: '/game', label: 'AI Game for Lazy Ones' },
                    { to: '/seating', label: 'AI Seating Planner' }
                  ].map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => { setMenuOpen(false); closeDropdown(); }}
                      className={`
                        block px-4 py-2 rounded-lg
                        ${isDark ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'}
                        transition-colors duration-200
                      `}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Regular Nav Items */}
            {[
              { to: '/pricing', label: 'Pricing' },
              { to: '/about', label: 'About' },
              { to: '/contactus', label: 'Contact' }
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={`
                  block px-4 py-3 rounded-lg text-lg font-medium
                  ${isDark ? 'text-gray-100 hover:text-blue-400 hover:bg-gray-800' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'}
                  transition-colors duration-200
                `}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Login */}
            <div>
              <button
                onClick={() => toggleDropdown('login')}
                className={`
                  flex items-center justify-between w-full px-4 py-3 text-left
                  ${isDark ? 'text-gray-100' : 'text-gray-700'}
                  font-medium text-lg
                `}
              >
                Login
                <svg 
                  className={`w-5 h-5 transition-transform duration-200 ${dropdownOpen === 'login' ? 'rotate-180' : ''}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {dropdownOpen === 'login' && (
                <div className="ml-4 mt-2 space-y-2">
                  {[
                    { to: '/LoginPer', label: 'Personal' },
                    { to: '/Loginad', label: 'Organization' }
                  ].map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => { setMenuOpen(false); closeDropdown(); }}
                      className={`
                        block px-4 py-2 rounded-lg
                        ${isDark ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-800' : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'}
                        transition-colors duration-200
                      `}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;