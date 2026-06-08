import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const imageMap = {
    '/images/mockup_royal.png': new URL('../assets/images/mockup_royal.png', import.meta.url).href,
    '/images/mockup_ethereal.png': new URL('../assets/images/mockup_ethereal.png', import.meta.url).href,
    '/images/mockup_night_organic.png': new URL('../assets/images/mockup_night_organic.png', import.meta.url).href,
    '/images/mockup_minimalist.png': new URL('../assets/images/mockup_minimalist.png', import.meta.url).href,
    '/images/mockup_organic.png': new URL('../assets/images/mockup_organic.png', import.meta.url).href,
};
const getImage = (img) => imageMap[img] || img;

const CartDrawer = () => {
    const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();

    return (
        <>
            {/* Overlay */}
            {isCartOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
                    onClick={() => setIsCartOpen(false)}
                />
            )}

            {/* Drawer */}
            <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 bg-green-800 text-white">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">🛒</span>
                        <h2 className="text-xl font-serif font-bold">Your Cart</h2>
                        {totalItems > 0 && (
                            <span className="bg-white text-green-800 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="w-9 h-9 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
                            <span className="text-7xl">🛒</span>
                            <p className="text-lg font-medium">Your cart is empty</p>
                            <p className="text-sm">Add some natural goodness!</p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="mt-4 px-6 py-3 bg-green-700 text-white rounded-full hover:bg-green-800 transition font-medium"
                            >
                                Shop Now
                            </button>
                        </div>
                    ) : (
                        <>
                            {cartItems.map(item => (
                                <div key={item._id} className="flex gap-4 p-4 bg-green-50 rounded-2xl border border-green-100">
                                    <img
                                        src={getImage(item.image)}
                                        alt={item.name}
                                        className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-serif font-bold text-green-900 text-sm leading-tight">{item.name}</h4>
                                        <p className="text-green-600 text-xs mt-1">{item.category}</p>
                                        <p className="text-green-800 font-bold mt-2">LKR {(item.price * item.quantity).toLocaleString()}</p>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-2 mt-3">
                                            <button
                                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                className="w-7 h-7 bg-white border border-green-200 rounded-full flex items-center justify-center text-green-700 hover:bg-green-100 transition font-bold text-sm"
                                            >−</button>
                                            <span className="w-8 text-center font-bold text-gray-700 text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                className="w-7 h-7 bg-white border border-green-200 rounded-full flex items-center justify-center text-green-700 hover:bg-green-100 transition font-bold text-sm"
                                            >+</button>
                                            <button
                                                onClick={() => removeFromCart(item._id)}
                                                className="ml-auto w-7 h-7 bg-red-50 border border-red-100 rounded-full flex items-center justify-center text-red-400 hover:bg-red-100 transition"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={clearCart}
                                className="w-full py-2 text-sm text-red-400 hover:text-red-600 transition"
                            >
                                🗑️ Clear all items
                            </button>
                        </>
                    )}
                </div>

                {/* Footer / Checkout */}
                {cartItems.length > 0 && (
                    <div className="border-t border-green-100 p-6 space-y-4 bg-white">
                        {/* Summary */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Subtotal ({totalItems} items)</span>
                                <span>LKR {totalPrice.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Delivery</span>
                                <span>Free 🌿</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-green-900 pt-2 border-t border-green-100">
                                <span>Total</span>
                                <span>LKR {totalPrice.toLocaleString()}</span>
                            </div>
                        </div>

                        {/* Checkout Button */}
                        <button
                            onClick={() => {
                                setIsCartOpen(false);
                                navigate('/checkout');
                            }}
                            className="w-full py-4 bg-green-800 text-white font-bold rounded-2xl hover:bg-green-900 transition shadow-lg hover:shadow-green-200 transform hover:-translate-y-0.5 text-lg"
                        >
                            Checkout 🛍️
                        </button>
                        <button
                            onClick={() => setIsCartOpen(false)}
                            className="w-full py-3 border-2 border-green-200 text-green-700 font-medium rounded-2xl hover:bg-green-50 transition"
                        >
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;
