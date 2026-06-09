import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AdminDashboard from './pages/AdminDashboard';
import MyInquiries from './pages/MyInquiries';
import Profile from './pages/Profile';
import AdminRoute from './components/AdminRoute';

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <ScrollToTop />
                    <div className="flex flex-col min-h-screen">
                        <Navbar />
                        <CartDrawer />
                        <main className="flex-grow">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/products" element={<Products />} />
                                <Route path="/gallery" element={<Gallery />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/checkout" element={<Checkout />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/forgot-password" element={<ForgotPassword />} />
                                <Route path="/resetpassword/:resettoken" element={<ResetPassword />} />
                                <Route path="/my-inquiries" element={<MyInquiries />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/admin" element={
                                    <AdminRoute>
                                        <AdminDashboard />
                                    </AdminRoute>
                                } />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </Router>
            </CartProvider>
        </AuthProvider>
    )
}

export default App;
