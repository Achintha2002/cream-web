import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const linkClasses = ({ isActive }) =>
        isActive
            ? "bg-green-200 text-green-900 font-bold px-3 py-2 rounded-md transition font-medium"
            : "text-gray-600 hover:bg-green-200 hover:text-green-900 px-3 py-2 rounded-md transition font-medium";

    const mobileLinkClasses = "block py-4 px-6 text-sm hover:bg-green-50 text-gray-700";

    return (
        <nav className="fixed w-full z-50 glass-nav transition-all duration-300" id="navbar">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-24">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="font-serif text-3xl font-bold text-green-800 tracking-wider flex items-center gap-2">
                            <span className="text-4xl text-green-600">🌿</span> RAANI
                        </Link>
                    </div>
                    <div className="hidden md:flex space-x-4 items-center">
                        <NavLink to="/" className={linkClasses}>Home</NavLink>
                        <NavLink to="/about" className={linkClasses}>Our Story</NavLink>
                        <NavLink to="/products" className={linkClasses}>Products</NavLink>
                        <NavLink to="/gallery" className={linkClasses}>Gallery</NavLink>
                        <NavLink to="/contact" className={({ isActive }) =>
                            isActive
                                ? "ml-4 px-6 py-2 bg-green-800 text-white rounded-full shadow-lg shadow-green-200 transform translate-y-0 font-bold cursor-default transition"
                                : "ml-4 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-800 transition shadow-lg hover:shadow-green-200 transform hover:-translate-y-0.5"
                        }>Contact</NavLink>
                    </div>
                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button className="mobile-menu-button focus:outline-none" onClick={toggleMobileMenu}>
                            <svg className="w-6 h-6 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            <div className={`mobile-menu md:hidden bg-white border-t border-green-100 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                <Link to="/" className={mobileLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                <Link to="/about" className={mobileLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
                <Link to="/products" className={mobileLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
                <Link to="/gallery" className={mobileLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Gallery</Link>
                <Link to="/contact" className={mobileLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            </div>
        </nav>
    );
};

export default Navbar;
