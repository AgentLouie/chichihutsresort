import { FaFacebookF, FaPhoneAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.jpg';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-orange-500 text-white py-6 relative">
      <div className="flex flex-col items-center justify-center">
        {/* Logo */}
        <img src={logo} alt="ChiChi Huts Logo" className="h-16 mb-3" />

        {/* Resort Name */}
        <p className="font-montserrat font-semibold text-lg">ChiChi Huts Resort</p>

        {/* Copyright */}
        <p className="font-montserrat text-sm mt-1 text-center">
          © {new Date().getFullYear()} Chichi Huts Resort. All Rights Reserved.
        </p>
        <p className="font-montserrat font-semibold text-lg">
          0977 471 7299
        </p>
      </div>

      {/* Social Links and Contact */}
      <div className="flex flex-col md:flex-row md:absolute md:bottom-4 md:right-4 items-center gap-3 mt-4 md:mt-0">
        {/* Facebook Link */}
        <a
          href="https://www.facebook.com/ChiChiHutsResort"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-200 transition"
        >
          <FaFacebookF size={20} />
        </a>

        {/* Contact Button */}
        <button
          onClick={() => navigate('/contact')}
          className="flex items-center gap-2 bg-white text-orange-500 px-4 py-2 rounded-full shadow-lg hover:bg-gray-100 transition text-sm"
        >
          <FaPhoneAlt size={18} />
          <span>Contact Us</span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
