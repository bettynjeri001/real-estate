
import { FaFacebook, FaTwitter, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-r from-gray-900 to-red-800 text-gray-300 mt-20"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Evergreen Estate" className="w-12 h-12" />
              <span className="text-2xl font-bold text-white">
                Add <span className="text-red-500">ressly</span>
              </span>
            </Link>
            <p className="text-sm">
              Redefining luxury one home at a time
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-red-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/allProperties" className="hover:text-red-500 transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-red-500 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-red-500 transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg mb-2">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-800" />
                <span>123 Estate Ave, Property City</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPhone className="text-gray-800" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-red-500" />
                <a href="#" className="hover:text-gray-800 transition-colors">
                  info@addresly.com
                </a>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg mb-2">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-red-400 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-red-400 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-red-400 transition-colors">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 mt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Addressly. All rights reserved. | 
            <a href="#" className="hover:text-gray-600 px-2 transition-colors">Privacy Policy</a> • 
            <a href="#" className="hover:text-gray-600 px-2 transition-colors">Terms of Service</a>
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;