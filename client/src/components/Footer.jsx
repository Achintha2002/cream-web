import { Link } from 'react-router-dom';
import logoImg from '../assets/images/logo.png';

const Footer = () => {
    return (
        <footer className="bg-green-900 text-white pt-16 pb-8 border-t-4 border-green-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <img src={logoImg} alt="Raani Cream Logo" className="h-16 mb-4 bg-white p-1 rounded-xl" />
                        <p className="text-green-100">Unveiling your natural beauty with the purest ingredients from Mother
                            Earth.</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-green-300">Quick Links</h4>
                        <ul className="space-y-3 text-green-100">
                            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                            <li><Link to="/about" className="hover:text-white transition">Our Story</Link></li>
                            <li><Link to="/products" className="hover:text-white transition">Products</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-green-300">Contact</h4>
                        <ul className="space-y-3 text-green-100">
                            <li>No. 12, Lotus Road, Colombo 03</li>
                            <li>+94 77 123 4567</li>
                            <li>hello@raani.lk</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-green-300">Join the Green Movement</h4>
                        <div className="flex">
                            <input type="email" placeholder="Your email"
                                className="bg-green-800 text-white px-4 py-2 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-green-400 w-full placeholder-green-400 border border-green-700" />
                            <button
                                className="bg-white text-green-900 px-4 py-2 rounded-r-lg font-bold hover:bg-green-100 transition">Go</button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-green-800 pt-8 text-center text-green-400 text-sm">
                    &copy; 2024 Raani Cream. 100% Organic. Designed with 💚.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
