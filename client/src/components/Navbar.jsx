import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/images/logo.png';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const lastScrollY = useRef(0);

    const { totalItems, setIsCartOpen } = useCart();
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    /* ── Scroll detection ── */
    useEffect(() => {
        const handleScroll = () => {
            const current = window.scrollY;
            setIsScrolled(current > 20);

            if (current > lastScrollY.current && current > 80) {
                setIsHidden(true);   // scrolling down → hide
            } else {
                setIsHidden(false);  // scrolling up  → show
            }
            lastScrollY.current = current;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

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
            ? 'relative text-green-900 font-semibold tracking-widest text-[11px] uppercase pb-0.5 border-b border-green-900 transition'
            : 'relative text-gray-500 hover:text-green-900 tracking-widest text-[11px] uppercase pb-0.5 border-b border-transparent hover:border-green-900 transition';

    const mobileLinkClasses = 'block py-4 px-6 text-xs hover:bg-stone-50 text-gray-700 font-medium tracking-widest uppercase border-b border-stone-100';

    const navClass = [
        'navbar-root',
        isScrolled ? 'scrolled' : '',
        isHidden ? 'hidden-nav' : '',
    ].join(' ');

    return (
        <nav className={navClass} id="navbar">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

                {/* ── Search Overlay ── */}
                {isSearchOpen && (
                    <div className="search-overlay">
                        <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl mx-auto flex items-center gap-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 flex-shrink-0">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z" />
                            </svg>
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Search our organic collection…"
                                className="w-full text-base text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none border-b border-stone-300 focus:border-green-900 py-2 transition"
                                autoFocus
                            />
                            <button type="submit" className="btn-primary text-[11px] px-5 py-2">Go</button>
                            <button type="button" onClick={() => setIsSearchOpen(false)} className="text-gray-400 hover:text-gray-700 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </form>
                    </div>
                )}

                {/* ── Top Row ── */}
                <div className="flex justify-between items-center h-16 md:h-20 relative">

                    {/* Left: Search + Hamburger */}
                    <div className="flex items-center gap-4 w-1/4">
                        <button className="md:hidden text-gray-600 hover:text-green-900 transition" onClick={toggleMobileMenu} aria-label="Menu">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen
                                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                                }
                            </svg>
                        </button>
                        <button onClick={() => setIsSearchOpen(true)} className="text-gray-500 hover:text-green-900 transition" aria-label="Search">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z" />
                            </svg>
                        </button>
                    </div>

                    {/* Center: Logo */}
                    <div className="absolute left-1/2 -translate-x-1/2">
                        <Link to="/" aria-label="Home">
                            <img src={logoImg} alt="Raani Cream" className="h-14 md:h-16 w-auto mix-blend-multiply object-contain" />
                        </Link>
                    </div>

                    {/* Right: Profile + Cart */}
                    <div className="flex items-center justify-end gap-4 w-1/4">
                        {/* Profile */}
                        {isAuthenticated ? (
                            <div className="relative group">
                                <button className="text-gray-500 hover:text-green-900 flex items-center gap-1.5 transition" aria-label="Account">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                    <span className="text-[11px] tracking-widest hidden lg:inline max-w-[70px] truncate uppercase">{user.name.split(' ')[0]}</span>
                                </button>
                                <div className="absolute right-0 top-full mt-3 w-48 bg-white border border-stone-200 rounded-xl shadow-xl py-2 hidden group-hover:block z-50 text-sm">
                                    <div className="px-4 py-2 text-xs text-gray-400 uppercase tracking-widest border-b border-stone-100">{user.name}</div>
                                    <Link to="/my-inquiries" className="block px-4 py-2.5 text-gray-700 hover:bg-stone-50 hover:text-green-900 transition">My Inquiries</Link>
                                    {user.role === 'admin' && (
                                        <Link to="/admin" className="block px-4 py-2.5 text-amber-600 hover:bg-amber-50 transition">Admin Panel</Link>
                                    )}
                                    <div className="border-t border-stone-100 mt-1 pt-1">
                                        <button onClick={logout} className="w-full text-left px-4 py-2.5 text-red-500 hover:bg-red-50 transition">Sign Out</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link to="/login" className="text-gray-500 hover:text-green-900 transition" aria-label="Login">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                            </Link>
                        )}

                        {/* Cart */}
                        <button onClick={() => setIsCartOpen(true)} className="relative text-gray-500 hover:text-green-900 transition" aria-label="Cart">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                            {totalItems > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-green-800 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* ── Bottom Nav Row (Desktop) ── */}
                <div className="hidden md:flex justify-center items-center h-10 border-t border-stone-100 gap-10">
                    <NavLink to="/" className={linkClasses} end>Home</NavLink>
                    <NavLink to="/about" className={linkClasses}>Our Story</NavLink>
                    <NavLink to="/products" className={linkClasses}>Shop</NavLink>
                    <NavLink to="/gallery" className={linkClasses}>Gallery</NavLink>
                    <NavLink to="/contact" className={linkClasses}>Contact</NavLink>
                </div>
            </div>

            {/* ── Mobile Menu ── */}
            <div className={`md:hidden bg-white border-t border-stone-100 transition-all overflow-hidden ${isMobileMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
                <div className="py-2">
                    <Link to="/" className={mobileLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                    <Link to="/about" className={mobileLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
                    <Link to="/products" className={mobileLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
                    <Link to="/gallery" className={mobileLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Gallery</Link>
                    <Link to="/contact" className={mobileLinkClasses} onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>

                    {isAuthenticated ? (
                        <div className="px-6 py-4 bg-stone-50 flex flex-col gap-2.5">
                            <p className="text-xs uppercase tracking-widest text-gray-400">{user.name}</p>
                            <Link to="/my-inquiries" className="btn-primary text-center text-[11px]" onClick={() => setIsMobileMenuOpen(false)}>My Inquiries</Link>
                            {user.role === 'admin' && (
                                <Link to="/admin" className="w-full text-center py-2 px-4 bg-amber-600 text-white text-xs font-bold rounded-full transition hover:bg-amber-700" onClick={() => setIsMobileMenuOpen(false)}>Admin Panel</Link>
                            )}
                            <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full py-2 text-red-500 text-xs font-semibold rounded-full bg-red-50 hover:bg-red-100 transition">Sign Out</button>
                        </div>
                    ) : (
                        <Link to="/login" className="block py-4 px-6 text-xs uppercase tracking-widest bg-stone-50 text-green-900 font-bold hover:bg-stone-100 transition" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
