import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.jpg';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleBookNow = () => {
    navigate('/contact');
    setIsOpen(false);
  };

  // Handle scroll direction
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`bg-transparent w-full fixed top-0 left-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-16 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-12 w-12 mr-3" />
          <h1 className="text-2xl font-bold text-gray-300 font-montserrat">
            Chichi Huts Resort
          </h1>
        </div>

        {/* Hamburger Menu*/}
        <div className="md:hidden z-50">
          {isOpen ? (
            <X 
              size={28} 
              onClick={() => setIsOpen(false)} 
              className="cursor-pointer text-white"
            />
          ) : (
            <Menu 
              size={28} 
              onClick={() => setIsOpen(true)} 
              className="cursor-pointer text-white"
            />
          )}
        </div>

        {/* Navigation*/}
        <nav
          className={`fixed top-0 left-0 w-full h-screen bg-black bg-opacity-90 flex flex-col justify-center items-center transform ${
    isOpen ? 'translate-x-0' : '-translate-x-full'
  } transition-transform duration-300 md:static md:bg-transparent md:w-auto md:h-auto md:flex-row md:translate-x-0`}
        >
          <ul className="flex flex-col md:flex-row items-center md:space-x-8">
            <li>
              <Link
                to="/"
                className="text-gray-300 hover:text-orange-500 font-montserrat text-lg md:text-base py-3"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/rooms"
                className="text-gray-300 hover:text-orange-500 font-montserrat text-lg md:text-base py-3"
                onClick={() => setIsOpen(false)}
              >
                Rooms
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-300 hover:text-orange-500 font-montserrat text-lg md:text-base py-3"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Book Now Hamburger Menu */}
          <button
            className="mt-6 bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600 transition duration-300 md:hidden"
            onClick={() => {
              setIsOpen(false);
              navigate('/contact');
            }}
          >
            BOOK NOW!
          </button>
        </nav>

        {/* Book Now Button*/}
        <div className={`hidden md:block`}>
          <button onClick={() => {
            setIsOpen(false);
            navigate('/contact');
            }}
            className="bg-orange-500 text-white px-5 py-2 rounded-full opacity-80 hover:bg-orange-600 transition duration-300"
          >
            BOOK NOW!
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
