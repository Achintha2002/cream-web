import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ordersAPI } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

const imageMap = {
    '/images/mockup_royal.png': new URL('../assets/images/mockup_royal.png', import.meta.url).href,
    '/images/mockup_ethereal.png': new URL('../assets/images/mockup_ethereal.png', import.meta.url).href,
    '/images/mockup_night_organic.png': new URL('../assets/images/mockup_night_organic.png', import.meta.url).href,
    '/images/mockup_minimalist.png': new URL('../assets/images/mockup_minimalist.png', import.meta.url).href,
    '/images/mockup_organic.png': new URL('../assets/images/mockup_organic.png', import.meta.url).href,
};
const getImage = (img) => imageMap[img] || img;

const Checkout = () => {
    const { cartItems, totalPrice, totalItems, clearCart } = useCart();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        notes: '',
        paymentMethod: 'cod',
    });

    const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'
    const [orderResult, setOrderResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.phone || !formData.street || !formData.city) {
            setStatus('error');
            setErrorMessage('Please fill in all required fields.');
            return;
        }

        const orderData = {
            customer: {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                address: {
                    street: formData.street,
                    city: formData.city,
                }
            },
            items: cartItems.map(item => ({
                product: item._id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                image: item.image
            })),
            paymentMethod: formData.paymentMethod,
            notes: formData.notes
        };

        try {
            setStatus('loading');
            setErrorMessage('');
            const response = await ordersAPI.create(orderData);
            if (response.success) {
                setStatus('success');
                setOrderResult(response.data);
                clearCart();
            } else {
                setStatus('error');
                setErrorMessage(response.message || 'Failed to place order.');
            }
        } catch (err) {
            setStatus('error');
            setErrorMessage(err.message || 'Failed to place order.');
            console.error('Checkout error:', err);
        }
    };

    if (status === 'success' && orderResult) {
        return (
            <div className="pt-32 pb-24 max-w-3xl mx-auto px-4 text-center">
                <div className="bg-white p-10 md:p-16 rounded-3xl shadow-xl border border-green-100 flex flex-col items-center">
                    <span className="text-7xl mb-6 animate-bounce">🎉</span>
                    <h1 className="text-4xl font-serif font-bold text-green-900 mb-2">Order Confirmed!</h1>
                    <p className="text-gray-500 mb-6">Thank you for shopping with RAANI. Your order has been placed successfully.</p>

                    <div className="w-full bg-green-50 p-6 rounded-2xl border border-green-100 text-left mb-8 space-y-3">
                        <p className="text-green-800 font-bold">Order Details:</p>
                        <p className="text-gray-700 text-sm"><span className="font-semibold">Order ID:</span> {orderResult._id}</p>
                        <p className="text-gray-700 text-sm"><span className="font-semibold">Customer:</span> {orderResult.customer?.name}</p>
                        <p className="text-gray-700 text-sm"><span className="font-semibold">Total Amount:</span> LKR {orderResult.totalAmount?.toLocaleString()}</p>
                        <p className="text-gray-700 text-sm"><span className="font-semibold">Payment Method:</span> {orderResult.paymentMethod?.toUpperCase()}</p>
                    </div>

                    <Link to="/products" className="px-8 py-4 bg-green-800 text-white rounded-full font-bold shadow-lg hover:bg-green-900 transition">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="pt-32 pb-24 text-center">
                <h2 className="text-3xl font-serif font-bold text-green-900 mb-4">Your Cart is Empty</h2>
                <p className="text-gray-600 mb-8">Add items to your cart before checking out.</p>
                <Link to="/products" className="px-8 py-3 bg-green-800 text-white rounded-full font-bold shadow-lg hover:bg-green-900 transition">
                    View Products
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-serif font-bold text-green-900 mb-10 text-center">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Form Billing */}
                <div className="lg:col-span-7 bg-white p-8 rounded-3xl shadow-lg border border-green-50">
                    <h3 className="text-2xl font-serif font-bold mb-6 text-green-800 border-b border-green-50 pb-4">
                        Shipping & Delivery Details
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-600 font-medium mb-2 text-sm uppercase tracking-wide">Full Name *</label>
                                <input
                                    required type="text" name="name" value={formData.name} onChange={handleChange}
                                    className="w-full bg-green-50/50 border border-green-100 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                    placeholder="Jane Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 font-medium mb-2 text-sm uppercase tracking-wide">Phone Number *</label>
                                <input
                                    required type="tel" name="phone" value={formData.phone} onChange={handleChange}
                                    className="w-full bg-green-50/50 border border-green-100 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                    placeholder="+94 77 123 4567"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-600 font-medium mb-2 text-sm uppercase tracking-wide">Email Address *</label>
                            <input
                                required type="email" name="email" value={formData.email} onChange={handleChange}
                                className="w-full bg-green-50/50 border border-green-100 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                placeholder="jane@example.com"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-600 font-medium mb-2 text-sm uppercase tracking-wide">Street Address *</label>
                                <input
                                    required type="text" name="street" value={formData.street} onChange={handleChange}
                                    className="w-full bg-green-50/50 border border-green-100 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                    placeholder="No. 123, Galle Road"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 font-medium mb-2 text-sm uppercase tracking-wide">City *</label>
                                <input
                                    required type="text" name="city" value={formData.city} onChange={handleChange}
                                    className="w-full bg-green-50/50 border border-green-100 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                                    placeholder="Colombo 03"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-600 font-medium mb-2 text-sm uppercase tracking-wide">Order Notes (Optional)</label>
                            <textarea
                                name="notes" value={formData.notes} onChange={handleChange}
                                className="w-full bg-green-50/50 border border-green-100 rounded-xl px-5 py-3 h-24 focus:outline-none focus:ring-2 focus:ring-green-500 transition resize-none"
                                placeholder="Any special instructions for delivery..."
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-gray-600 font-medium mb-3 text-sm uppercase tracking-wide">Payment Method</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition ${formData.paymentMethod === 'cod' ? 'border-green-600 bg-green-50/50' : 'border-gray-200'}`}>
                                    <input
                                        type="radio" name="paymentMethod" value="cod"
                                        checked={formData.paymentMethod === 'cod'} onChange={handleChange}
                                        className="text-green-600 focus:ring-green-500"
                                    />
                                    <div>
                                        <p className="font-bold text-green-900 text-sm">Cash on Delivery (COD)</p>
                                        <p className="text-gray-500 text-xs">Pay with cash when items arrive</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full py-4 bg-green-800 text-white font-bold rounded-xl hover:bg-green-900 transition shadow-lg text-lg flex items-center justify-center gap-2"
                        >
                            {status === 'loading' ? (
                                <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Placing Order...</>
                            ) : 'Place Order LKR ' + totalPrice.toLocaleString()}
                        </button>

                        {status === 'error' && errorMessage && (
                            <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm font-medium text-center">
                                ❌ {errorMessage}
                            </div>
                        )}
                    </form>
                </div>

                {/* Summary Section */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-green-50/50 p-8 rounded-3xl border border-green-100">
                        <h3 className="text-2xl font-serif font-bold mb-6 text-green-800">Order Summary</h3>

                        <div className="divide-y divide-green-100 max-h-96 overflow-y-auto pr-2">
                            {cartItems.map(item => (
                                <div key={item._id} className="py-4 flex gap-4">
                                    <img
                                        src={getImage(item.image)}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-xl border border-green-100 flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-serif font-bold text-green-900 text-sm truncate">{item.name}</h4>
                                        <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                                        <p className="text-green-800 font-bold text-sm mt-1">LKR {(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-green-100 pt-6 space-y-3 mt-6">
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Subtotal</span>
                                <span>LKR {totalPrice.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Shipping</span>
                                <span className="text-green-600">Free 🌿</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-green-900 border-t border-green-100 pt-3">
                                <span>Total</span>
                                <span>LKR {totalPrice.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
