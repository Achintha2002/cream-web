import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/images/logo.png';
const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const { totalItems, setIsCartOpen } = useCart();
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchInput.trim())}`);
            setIsSearchOpen(false);
            setSearchInput('');
        }
    };

    const linkClasses = ({ isActive }) =>
        isActive
            ? "border-b border-green-800 text-green-800 font-semibold px-1 py-1.5 transition tracking-widest text-xs uppercase"
            : "text-gray-600 hover:text-green-800 px-1 py-1.5 transition font-medium tracking-widest text-xs uppercase border-b border-transparent";

    const mobileLinkClasses = "block py-4 px-6 text-xs hover:bg-green-50 text-gray-700 font-semibold tracking-wider uppercase";

    return (
        <nav className="fixed w-full z-50 bg-white border-b border-gray-100 shadow-sm transition-all duration-300" id="navbar">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Search Bar Overlay */}
                {isSearchOpen && (
                    <div className="absolute inset-0 bg-white z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8">
                        <form onSubmit={handleSearchSubmit} className="w-full max-w-3xl mx-auto flex items-center gap-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z" />
                            </svg>
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Search our pure organic collection..."
                                className="w-full text-base md:text-lg text-gray-800 placeholder-gray-400 focus:outline-none border-b border-transparent focus:border-green-800 py-2"
                                autoFocus
                            />
                            <button type="submit" className="bg-green-800 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-green-700 transition">
                                Search
                            </button>
                            <button type="button" onClick={() => setIsSearchOpen(false)} className="text-gray-500 hover:text-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </form>
                    </div>
                )}

                {/* Main Row */}
                <div className="flex justify-between items-center h-20 md:h-24 relative">
                    {/* Left Side: Mobile Menu Button (Mobile) / Search Icon (Desktop/Mobile) */}
                    <div className="flex items-center gap-4 w-1/4">
                        <button className="md:hidden text-gray-600 hover:text-green-800 focus:outline-none" onClick={toggleMobileMenu}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                        <button onClick={() => setIsSearchOpen(true)} className="text-gray-600 hover:text-green-800 transition duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z" />
                            </svg>
                        </button>
                    </div>

                    {/* Center: Logo */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 flex justify-center">
                        <Link to="/" className="flex flex-col items-center">
                            <img src={logoImg} alt="Raani Cream Logo" className="h-16 md:h-20 w-auto mix-blend-multiply object-contain" />
                        </Link>
                    </div>

                    {/* Right: Icons (Profile and Cart) */}
                    <div className="flex items-center justify-end gap-3 md:gap-4 w-1/4">
                        {/* Profile/User Icon */}
                        {isAuthenticated ? (
                            <div className="relative group">
                                <button className="flex items-center gap-1 text-gray-600 hover:text-green-800 transition duration-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                    <span className="text-xs hidden lg:inline max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                                </button>
                                {/* Dropdown Menu */}
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-md shadow-lg py-1 hidden group-hover:block z-50">
                                    <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-50">Hi, {user.name}</div>
                                    <Link to="/my-inquiries" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50">My Inquiries</Link>
                                    {user.role === 'admin' && (
                                        <Link to="/admin" className="block px-4 py-2 text-sm text-amber-600 hover:bg-amber-50">Admin Panel</Link>
                                    )}
                                    <button onClick={logout} className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50">Log Out</button>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="text-gray-600 hover:text-green-800 transition duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                            </Link>
                        )}

                        {/* Cart Icon */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative text-gray-600 hover:text-green-800 transition duration-200"
                            aria-label="Open Cart"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center animate-bounce">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Bottom Row: Navigation Links (Hidden on mobile) */}
                <div className="hidden md:flex justify-center items-center h-12 border-t border-gray-100">
                    <div className="flex space-x-8">
                        <NavLink to="/" className={linkClasses}>Home</NavLink>
                        <NavLink to="/about" className={linkClasses}>Our Story</NavLink>
                        <NavLink to="/products" className={linkClasses}>Products</NavLink>
                        <NavLink to="/gallery" className={linkClasses}>Gallery</NavLink>
                        <NavLink to="/contact" className={linkClasses}>Contact</NavLink>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu md:hidden bg-white border-t border-gray-100 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
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
                        )}
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
