import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { totalItems, setIsCartOpen } = useCart();
    const { user, logout, isAuthenticated } = useAuth();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const linkClasses = ({ isActive }) =>
        isActive
            ? "bg-green-200 text-green-900 font-bold px-3 py-2 rounded-md transition font-medium"
            : "text-gray-600 hover:bg-green-200 hover:text-green-900 px-3 py-2 rounded-md transition font-medium";

    const mobileLinkClasses = "block py-4 px-6 text-sm hover:bg-green-50 text-gray-700 font-medium";

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

                        {/* Cart Button */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-2 text-gray-600 hover:text-green-800 transition duration-200 focus:outline-none ml-2"
                            aria-label="Open Cart"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1,0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0,1-1.12-1.243l1.264-12A1.125 1.125 0 0,1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1,1-.75 0 .375.375 0 0,1 .75 0Zm7.5 0a.375.375 0 1,1-.75 0 .375.375 0 0,1 .75 0Z" />
                            </svg>
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                                    {totalItems}
                                </span>
                            )}
                        </button>

                        <NavLink to="/contact" className={({ isActive }) =>
                            isActive
                                ? "ml-2 px-6 py-2 bg-green-800 text-white rounded-full shadow-lg shadow-green-200 transform translate-y-0 font-bold cursor-default transition"
                                : "ml-2 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-800 transition shadow-lg hover:shadow-green-200 transform hover:-translate-y-0.5"
                        }>Contact</NavLink>
                        {/* Login / Profile status */}
                        {isAuthenticated ? (
                            <div className="flex flex-wrap items-center gap-2.5 ml-4 bg-green-50 pl-4 pr-2 py-1.5 rounded-full border border-green-100">
                                <span className="text-sm font-semibold text-green-900">Hi, {user.name.split(' ')[0]}</span>
                                <Link to="/my-inquiries" className="text-xs bg-green-800 hover:bg-green-900 text-white font-bold px-3 py-1.5 rounded-full transition">
                                    My Inquiries
                                </Link>
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="text-xs bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded-full transition">
                                        Admin Panel
                                    </Link>
                                )}
                                <button
                                    onClick={logout}
                                    className="px-4 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-full transition"
                                >
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            <NavLink to="/login" className={({ isActive }) =>
                                isActive
                                    ? "ml-4 text-green-900 font-bold px-3 py-2 rounded-md"
                                    : "ml-4 text-gray-600 hover:text-green-800 px-3 py-2 rounded-md font-semibold"
                            }>Log In</NavLink>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center gap-4">
                        {/* Mobile Cart Button */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-2 text-gray-600 hover:text-green-800 transition duration-200 focus:outline-none"
                            aria-label="Open Cart"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1,0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0,1-1.12-1.243l1.264-12A1.125 1.125 0 0,1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1,1-.75 0 .375.375 0 0,1 .75 0Zm7.5 0a.375.375 0 1,1-.75 0 .375.375 0 0,1 .75 0Z" />
                            </svg>
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </button>

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
                {isAuthenticated ? (
                    <div className="border-t border-green-50 p-6 bg-green-50/50 flex flex-col gap-3">
                        <span className="text-sm font-semibold text-green-900">Logged in as {user.name}</span>
                        <Link to="/my-inquiries" className="w-full py-2 bg-green-800 hover:bg-green-900 text-white font-bold text-center text-sm rounded-xl transition" onClick={() => setIsMobileMenuOpen(false)}>
                            My Inquiries
                        </Link>
                        {user.role === 'admin' && (
                            <Link to="/admin" className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-center text-sm rounded-xl transition" onClick={() => setIsMobileMenuOpen(false)}>
                                Admin Dashboard
                            </Link>
                        )} )}
                        <button
                            onClick={() => {
                                logout();
                                setIsMobileMenuOpen(false);
                            }}
                            className="w-full py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-bold rounded-xl transition"
                        >
                            Log Out
                        </button>
                    </div>
                ) : (
                    <Link to="/login" className="block py-4 px-6 text-sm bg-green-50 text-green-800 font-bold hover:bg-green-100" onClick={() => setIsMobileMenuOpen(false)}>Log In</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
