import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const stored = localStorage.getItem('raani_cart');
            return stored ? JSON.parse(stored) : [];
        } catch { return []; }
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Persist to localStorage
    useEffect(() => {
        localStorage.setItem('raani_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item._id === product._id);
            if (existing) {
                return prev.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true); // Open cart drawer on add
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item._id !== id));
    };

    const updateQuantity = (id, qty) => {
        if (qty < 1) { removeFromCart(id); return; }
        setCartItems(prev =>
            prev.map(item => item._id === id ? { ...item, quantity: qty } : item)
        );
    };

    const clearCart = () => setCartItems([]);

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cartItems, addToCart, removeFromCart, updateQuantity, clearCart,
            totalItems, totalPrice, isCartOpen, setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
};
