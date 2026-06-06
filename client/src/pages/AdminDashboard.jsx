import { useEffect, useState } from 'react';
import { ordersAPI, contactAPI, productsAPI } from '../services/api';

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [messages, setMessages] = useState([]);
    const [products, setProducts] = useState([]);
    
    // Admin Sub-views state
    // Views: 'overview' | 'orders' | 'inventory' | 'add-product' | 'messages'
    const [currentView, setCurrentView] = useState('overview');
    
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null); // ID of active operation
    const [error, setError] = useState(null);
    const [replyTexts, setReplyTexts] = useState({});

    // Selected order for detailed modal view
    const [selectedOrder, setSelectedOrder] = useState(null);
    
    // Add product form state
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        image: '/images/mockup_royal.png', // Default placeholder
        category: 'Face Cream',
        isFeatured: false,
        stock: 50
    });

    // Fetch dashboard data
    const fetchDashboardData = async (silent = false) => {
        try {
            if (!silent) setLoading(true);
            const [ordersRes, messagesRes, productsRes] = await Promise.all([
                ordersAPI.getAll(),
                contactAPI.getAll(),
                productsAPI.getAll()
            ]);

            if (ordersRes.success) setOrders(ordersRes.data);
            if (messagesRes.success) setMessages(messagesRes.data);
            if (productsRes.success) setProducts(productsRes.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching admin data:', err);
            if (!silent) setError('Failed to fetch dashboard data. Please make sure the server is running.');
        } finally {
            if (!silent) setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();

        // Real-time polling every 8 seconds
        const pollInterval = setInterval(() => {
            fetchDashboardData(true);
        }, 8000);

        return () => clearInterval(pollInterval);
    }, []);

    // Handle Order Status Update
    const handleStatusChange = async (orderId, newStatus) => {
        try {
            setActionLoading(orderId);
            const res = await ordersAPI.updateStatus(orderId, { status: newStatus });
            if (res.success) {
                setOrders(orders.map(order => order._id === orderId ? { ...order, status: newStatus } : order));
                if (selectedOrder && selectedOrder._id === orderId) {
                    setSelectedOrder({ ...selectedOrder, status: newStatus });
                }
            }
        } catch (err) {
            alert('Failed to update status: ' + err.message);
        } finally {
            setActionLoading(null);
        }
    };

    // Handle Mark Message as Read
    const handleMarkAsRead = async (messageId) => {
        try {
            setActionLoading(messageId);
            const res = await contactAPI.markRead(messageId);
            if (res.success) {
                setMessages(messages.map(msg => msg._id === messageId ? { ...msg, isRead: true } : msg));
            }
        } catch (err) {
            alert('Failed to update message: ' + err.message);
        } finally {
            setActionLoading(null);
        }
    };

    // Handle Send Reply to Message
    const handleSendReply = async (messageId, replyText) => {
        if (!replyText.trim()) return;
        try {
            setActionLoading(`reply_${messageId}`);
            const res = await contactAPI.reply(messageId, replyText);
            if (res.success) {
                setMessages(messages.map(msg => msg._id === messageId ? { ...msg, reply: replyText, isRead: true } : msg));
            }
        } catch (err) {
            alert('Failed to send reply: ' + err.message);
        } finally {
            setActionLoading(null);
        }
    };

    // Handle Add Product
    const handleAddProductSubmit = async (e) => {
        e.preventDefault();
        try {
            setActionLoading('add_product');
            const productToSubmit = {
                ...newProduct,
                price: parseFloat(newProduct.price),
                stock: parseInt(newProduct.stock)
            };

            const res = await productsAPI.create(productToSubmit);
            if (res.success) {
                setProducts([res.data, ...products]);
                alert('🎉 Product added successfully to the catalog!');
                // Reset form
                setNewProduct({
                    name: '',
                    description: '',
                    price: '',
                    image: '/images/mockup_royal.png',
                    category: 'Face Cream',
                    isFeatured: false,
                    stock: 50
                });
                // Switch back to view products
                setCurrentView('inventory');
            }
        } catch (err) {
            alert('Failed to add product: ' + err.message);
        } finally {
            setActionLoading(null);
        }
    };

    // Handle Delete Product
    const handleDeleteProduct = async (productId) => {
        if (!window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) return;
        try {
            setActionLoading(productId);
            const res = await productsAPI.delete(productId);
            if (res.success) {
                setProducts(products.filter(p => p._id !== productId));
            }
        } catch (err) {
            alert('Failed to delete product: ' + err.message);
        } finally {
            setActionLoading(null);
        }
    };

    // --- CALCULATIONS & ANALYTICS ---
    const totalOrders = orders.length;
    const totalRevenue = orders
        .filter(order => order.status !== 'cancelled')
        .reduce((sum, order) => sum + order.totalAmount, 0);
    const unreadMessages = messages.filter(msg => !msg.isRead).length;

    // Order status ratios
    const statusCounts = orders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
    }, { processing: 0, shipped: 0, delivered: 0, cancelled: 0 });

    // Best Selling Products calculations
    const bestSellers = {};
    orders
        .filter(order => order.status !== 'cancelled')
        .forEach(order => {
            order.items.forEach(item => {
                const name = item.name;
                const quantity = item.quantity;
                const revenue = item.price * quantity;
                if (!bestSellers[name]) {
                    bestSellers[name] = { name, quantity: 0, revenue: 0 };
                }
                bestSellers[name].quantity += quantity;
                bestSellers[name].revenue += revenue;
            });
        });

    const bestSellersList = Object.values(bestSellers).sort((a, b) => b.quantity - a.quantity);
    const totalItemsSold = bestSellersList.reduce((sum, item) => sum + item.quantity, 0);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-green-50/20 pt-20">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-green-800 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-green-800 font-semibold">Loading Admin Console...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 bg-slate-50 flex flex-col md:flex-row">
            
            {/* --- ADMIN LEFT SIDEBAR (NAV BAR) --- */}
            <aside className="w-full md:w-64 bg-green-950 text-white flex flex-col border-r border-green-900 md:min-h-[calc(100vh-80px)]">
                {/* Branding/User Profile inside sidebar */}
                <div className="p-6 border-b border-green-900/60 bg-green-950/40">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center text-lg font-bold">
                            👑
                        </div>
                        <div>
                            <h4 className="font-bold text-sm">RAANI Console</h4>
                            <span className="text-xs text-green-400">Authenticated Admin</span>
                        </div>
                    </div>
                </div>

                {/* Sidebar Navigation Links */}
                <nav className="flex-grow p-4 space-y-1">
                    <button
                        onClick={() => setCurrentView('overview')}
                        className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${currentView === 'overview' ? 'bg-green-800 text-white shadow-md' : 'text-green-200 hover:bg-green-900/50'}`}
                    >
                        📊 <span className="tracking-wide">Overview & Analytics</span>
                    </button>

                    <button
                        onClick={() => setCurrentView('orders')}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${currentView === 'orders' ? 'bg-green-800 text-white shadow-md' : 'text-green-200 hover:bg-green-900/50'}`}
                    >
                        <span className="flex items-center gap-3.5">📦 <span>Manage Orders</span></span>
                        {orders.filter(o => o.status === 'processing').length > 0 && (
                            <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                {orders.filter(o => o.status === 'processing').length} New
                            </span>
                        )}
                    </button>

                    <button
                        onClick={() => setCurrentView('inventory')}
                        className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${currentView === 'inventory' ? 'bg-green-800 text-white shadow-md' : 'text-green-200 hover:bg-green-900/50'}`}
                    >
                        🧴 <span className="tracking-wide">View Stock / Inventory</span>
                    </button>

                    <button
                        onClick={() => setCurrentView('add-product')}
                        className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${currentView === 'add-product' ? 'bg-green-800 text-white shadow-md' : 'text-green-200 hover:bg-green-900/50'}`}
                    >
                        ➕ <span className="tracking-wide">Add New Product</span>
                    </button>

                    <button
                        onClick={() => setCurrentView('messages')}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${currentView === 'messages' ? 'bg-green-800 text-white shadow-md' : 'text-green-200 hover:bg-green-900/50'}`}
                    >
                        <span className="flex items-center gap-3.5">✉️ <span>Customer Inquiries</span></span>
                        {unreadMessages > 0 && (
                            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                {unreadMessages}
                            </span>
                        )}
                    </button>
                </nav>

                {/* Footer link in Sidebar */}
                <div className="p-4 border-t border-green-900/60 bg-green-950/20 text-center text-xs text-green-500 font-semibold">
                    🌿 RAANI Skincare System v1.1
                </div>
            </aside>

            {/* --- ADMIN CONTENT PANEL --- */}
            <main className="flex-1 p-6 md:p-10">
                <div className="max-w-6xl mx-auto">
                    
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-slate-200 pb-5">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-800 font-serif capitalize">
                                {currentView === 'overview' && '📊 Store Overview & Analytics'}
                                {currentView === 'orders' && '📦 Orders Management'}
                                {currentView === 'inventory' && '🧴 Stock / Product Inventory'}
                                {currentView === 'add-product' && '➕ Add New Product'}
                                {currentView === 'messages' && '✉️ Customer Inquiries'}
                            </h2>
                            <p className="text-slate-500 mt-1 text-sm">
                                {currentView === 'overview' && 'Sales metrics, fulfillment, and product performance analysis'}
                                {currentView === 'orders' && 'Process order statuses, verify customer addresses, and check invoice summaries'}
                                {currentView === 'inventory' && 'View in-stock quantities, adjust products list, and delete items'}
                                {currentView === 'add-product' && 'Add fresh organic products directly to the store frontend catalog'}
                                {currentView === 'messages' && 'Read and respond to contact submissions from customers'}
                            </p>
                        </div>
                        <button 
                            onClick={fetchDashboardData}
                            className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl shadow-sm text-xs transition"
                        >
                            🔄 Refresh Data
                        </button>
                    </div>

                    {error && (
                        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 font-medium">
                            ⚠️ {error}
                        </div>
                    )}

                    {/* --- VIEW 1: OVERVIEW & ANALYTICS --- */}
                    {currentView === 'overview' && (
                        <div className="space-y-8 animate-fadeIn">
                            {/* Summary Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl">
                                        💰
                                    </div>
                                    <div>
                                        <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider">Total Sales</span>
                                        <span className="text-2xl font-bold text-slate-800">LKR {totalRevenue.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl">
                                        📦
                                    </div>
                                    <div>
                                        <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider">Total Orders</span>
                                        <span className="text-2xl font-bold text-slate-800">{totalOrders}</span>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl">
                                        ✉️
                                    </div>
                                    <div>
                                        <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider">Unread Messages</span>
                                        <span className="text-2xl font-bold text-slate-800">{unreadMessages}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Best Selling Products */}
                                <div className="bg-white p-6 rounded-3xl border border-slate-200">
                                    <h3 className="font-serif font-bold text-slate-800 text-lg mb-4">🧴 Best Selling Products</h3>
                                    {bestSellersList.length === 0 ? (
                                        <p className="text-slate-400 text-sm py-4">No completed orders to compile statistics.</p>
                                    ) : (
                                        <div className="space-y-4">
                                            {bestSellersList.map((item, index) => {
                                                const percentage = totalItemsSold > 0 ? (item.quantity / totalItemsSold) * 100 : 0;
                                                return (
                                                    <div key={index} className="space-y-1.5">
                                                        <div className="flex justify-between text-sm">
                                                            <span className="font-semibold text-slate-700">{item.name}</span>
                                                            <span className="text-slate-500 font-bold">{item.quantity} sold ({percentage.toFixed(0)}%)</span>
                                                        </div>
                                                        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                                            <div 
                                                                className="bg-green-600 h-full rounded-full transition-all duration-500" 
                                                                style={{ width: `${percentage}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                {/* Order Status Breakdown */}
                                <div className="bg-white p-6 rounded-3xl border border-slate-200">
                                    <h3 className="font-serif font-bold text-slate-800 text-lg mb-4">📊 Order Fulfillment Analysis</h3>
                                    <div className="space-y-4">
                                        {/* Delivered */}
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-600 font-medium">Delivered Orders</span>
                                                <span className="text-emerald-600 font-bold">{statusCounts.delivered}</span>
                                            </div>
                                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                                <div 
                                                    className="bg-emerald-500 h-full rounded-full" 
                                                    style={{ width: `${totalOrders > 0 ? (statusCounts.delivered / totalOrders) * 100 : 0}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        {/* Processing */}
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-600 font-medium">Processing Orders</span>
                                                <span className="text-blue-600 font-bold">{statusCounts.processing}</span>
                                            </div>
                                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                                <div 
                                                    className="bg-blue-50 h-full rounded-full" 
                                                    style={{ width: `${totalOrders > 0 ? (statusCounts.processing / totalOrders) * 100 : 0}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        {/* Shipped */}
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-600 font-medium">Shipped Orders</span>
                                                <span className="text-amber-600 font-bold">{statusCounts.shipped}</span>
                                            </div>
                                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                                <div 
                                                    className="bg-amber-500 h-full rounded-full" 
                                                    style={{ width: `${totalOrders > 0 ? (statusCounts.shipped / totalOrders) * 100 : 0}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        {/* Cancelled */}
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-600 font-medium">Cancelled Orders</span>
                                                <span className="text-red-600 font-bold">{statusCounts.cancelled}</span>
                                            </div>
                                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                                <div 
                                                    className="bg-red-500 h-full rounded-full" 
                                                    style={{ width: `${totalOrders > 0 ? (statusCounts.cancelled / totalOrders) * 100 : 0}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- VIEW 2: ORDERS MANAGEMENT --- */}
                    {currentView === 'orders' && (
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-fadeIn">
                            <div className="p-6">
                                {orders.length === 0 ? (
                                    <div className="text-center py-12 text-slate-400">No orders placed yet.</div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-slate-100 text-slate-400 text-sm font-semibold">
                                                    <th className="py-4 px-4">Order ID</th>
                                                    <th className="py-4 px-4">Customer</th>
                                                    <th className="py-4 px-4">Total Amount</th>
                                                    <th className="py-4 px-4">Status</th>
                                                    <th className="py-4 px-4 text-center">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 text-slate-700 text-sm">
                                                {orders.map(order => (
                                                    <tr key={order._id} className="hover:bg-slate-50/50 transition-colors">
                                                        <td className="py-4 px-4">
                                                            <button 
                                                                onClick={() => setSelectedOrder(order)}
                                                                className="font-mono text-xs font-bold text-green-700 hover:underline bg-green-50 px-2.5 py-1.5 rounded-lg border border-green-100"
                                                            >
                                                                #{order._id.substring(0, 8)}
                                                            </button>
                                                        </td>
                                                        <td className="py-4 px-4">
                                                            <div className="font-semibold text-slate-800">{order.customer.name}</div>
                                                            <div className="text-xs text-slate-400">{order.customer.email}</div>
                                                        </td>
                                                        <td className="py-4 px-4 font-bold text-slate-800">
                                                            LKR {order.totalAmount.toLocaleString()}
                                                        </td>
                                                        <td className="py-4 px-4">
                                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                                                                order.status === 'processing' ? 'bg-blue-50 text-blue-600' :
                                                                order.status === 'shipped' ? 'bg-amber-50 text-amber-600' :
                                                                order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600' :
                                                                'bg-red-50 text-red-600'
                                                            }`}>
                                                                {order.status.toUpperCase()}
                                                            </span>
                                                        </td>
                                                        <td className="py-4 px-4 text-center">
                                                            {actionLoading === order._id ? (
                                                                <div className="w-5 h-5 border-2 border-green-800 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                                            ) : (
                                                                <select
                                                                    value={order.status}
                                                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                                    className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-green-500"
                                                                >
                                                                    <option value="processing">Processing</option>
                                                                    <option value="shipped">Shipped</option>
                                                                    <option value="delivered">Delivered</option>
                                                                    <option value="cancelled">Cancelled</option>
                                                                </select>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* --- VIEW 3: INVENTORY PRODUCTS (STOCK) --- */}
                    {currentView === 'inventory' && (
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-fadeIn">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-slate-800 text-lg">Current Products in Stock</h3>
                                    <button
                                        onClick={() => setCurrentView('add-product')}
                                        className="px-4 py-2 bg-green-800 hover:bg-green-900 text-white font-bold rounded-xl shadow-sm transition text-xs flex items-center gap-1.5"
                                    >
                                        ➕ Add Product
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-slate-100 text-slate-400 text-sm font-semibold">
                                                <th className="py-4 px-4">Product Details</th>
                                                <th className="py-4 px-4">Category</th>
                                                <th className="py-4 px-4">Price</th>
                                                <th className="py-4 px-4">Stock Level</th>
                                                <th className="py-4 px-4">Featured</th>
                                                <th className="py-4 px-4 text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 text-slate-700 text-sm">
                                            {products.map(product => (
                                                <tr key={product._id} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="py-4 px-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold text-slate-800">{product.name}</div>
                                                                <div className="text-xs text-slate-400 line-clamp-1 max-w-xs">{product.description}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 text-slate-500 font-medium">{product.category}</td>
                                                    <td className="py-4 px-4 font-bold text-slate-800">LKR {product.price.toLocaleString()}</td>
                                                    <td className="py-4 px-4">
                                                        <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold ${
                                                            product.stock <= 5 ? 'bg-red-50 text-red-600' :
                                                            product.stock <= 20 ? 'bg-amber-50 text-amber-600' :
                                                            'bg-green-50 text-green-700'
                                                        }`}>
                                                            {product.stock} units
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        {product.isFeatured ? (
                                                            <span className="text-amber-500 text-lg">★</span>
                                                        ) : (
                                                            <span className="text-slate-300 text-lg">☆</span>
                                                        )}
                                                    </td>
                                                    <td className="py-4 px-4 text-center">
                                                        {actionLoading === product._id ? (
                                                            <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleDeleteProduct(product._id)}
                                                                className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-lg text-xs transition"
                                                            >
                                                                🗑️ Remove
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- VIEW 4: ADD NEW PRODUCT FORM --- */}
                    {currentView === 'add-product' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
                            
                            {/* Product Form Panel */}
                            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 lg:col-span-2">
                                <h3 className="font-serif font-bold text-slate-800 text-lg mb-5 pb-3 border-b">🧴 Product Specifications</h3>
                                <form onSubmit={handleAddProductSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-slate-600 font-semibold mb-1 text-xs uppercase tracking-wider">Product Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={newProduct.name}
                                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 font-semibold"
                                            placeholder="Raani Anti-Aging Night Repair"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-slate-600 font-semibold mb-1 text-xs uppercase tracking-wider">Description</label>
                                        <textarea
                                            required
                                            value={newProduct.description}
                                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 min-h-[100px]"
                                            placeholder="Introduce benefits, ingredients and directions..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-slate-600 font-semibold mb-1 text-xs uppercase tracking-wider">Price (LKR)</label>
                                            <input
                                                type="number"
                                                required
                                                min="1"
                                                value={newProduct.price}
                                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 font-semibold"
                                                placeholder="2800"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-slate-600 font-semibold mb-1 text-xs uppercase tracking-wider">Stock Quantity</label>
                                            <input
                                                type="number"
                                                required
                                                min="0"
                                                value={newProduct.stock}
                                                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 font-semibold"
                                                placeholder="50"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-slate-600 font-semibold mb-1 text-xs uppercase tracking-wider">Category</label>
                                            <select
                                                value={newProduct.category}
                                                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 font-semibold"
                                            >
                                                <option value="Face Cream">Face Cream</option>
                                                <option value="Serum">Serum</option>
                                                <option value="Moisturizer">Moisturizer</option>
                                                <option value="Night Cream">Night Cream</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center gap-2 pl-1 pt-5">
                                            <input
                                                type="checkbox"
                                                id="isFeatured"
                                                checked={newProduct.isFeatured}
                                                onChange={(e) => setNewProduct({ ...newProduct, isFeatured: e.target.checked })}
                                                className="w-4 h-4 text-green-800 border-slate-300 rounded focus:ring-green-500"
                                            />
                                            <label htmlFor="isFeatured" className="text-sm font-semibold text-slate-700 select-none">
                                                Featured in Home / Hero
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-slate-600 font-semibold mb-1 text-xs uppercase tracking-wider">Image Resource Path</label>
                                        <input
                                            type="text"
                                            required
                                            value={newProduct.image}
                                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                                            placeholder="/images/mockup_royal.png"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={actionLoading === 'add_product'}
                                        className="w-full py-3 bg-green-800 hover:bg-green-900 text-white font-bold rounded-xl shadow transition text-sm flex items-center justify-center gap-2"
                                    >
                                        {actionLoading === 'add_product' ? (
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : '🚀 Publish Product to Catalog'}
                                    </button>
                                </form>
                            </div>

                            {/* Catalog Preview Panel */}
                            <div className="space-y-6">
                                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                                    <h3 className="font-serif font-bold text-slate-800 text-base mb-4">✨ Live Card Preview</h3>
                                    
                                    {/* Preview Card */}
                                    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition">
                                        <div className="h-48 bg-green-50/50 flex items-center justify-center relative overflow-hidden">
                                            <img 
                                                src={newProduct.image || '/images/mockup_royal.png'} 
                                                alt="Preview" 
                                                className="w-full h-full object-cover"
                                                onError={(e) => { e.target.src = '/images/mockup_royal.png'; }}
                                            />
                                            {newProduct.isFeatured && (
                                                <span className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                                                    Featured
                                                </span>
                                            )}
                                        </div>
                                        <div className="p-4 space-y-2">
                                            <span className="text-xs text-green-700 font-bold uppercase tracking-widest">{newProduct.category}</span>
                                            <h4 className="font-bold text-slate-800 line-clamp-1">{newProduct.name || 'Product Title'}</h4>
                                            <p className="text-xs text-slate-400 line-clamp-2 min-h-[32px]">{newProduct.description || 'Provide a brief description to see a summary preview here...'}</p>
                                            <div className="flex justify-between items-center pt-2">
                                                <span className="text-base font-bold text-slate-800">LKR {(parseFloat(newProduct.price) || 0).toLocaleString()}</span>
                                                <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md">Stock: {newProduct.stock}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}

                    {/* --- VIEW 5: CUSTOMER INQUIRIES --- */}
                    {currentView === 'messages' && (
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-fadeIn">
                            <div className="p-6">
                                {messages.length === 0 ? (
                                    <div className="text-center py-12 text-slate-400">No messages received yet.</div>
                                ) : (
                                    <div className="divide-y divide-slate-100">
                                        {messages.map(msg => (
                                            <div key={msg._id} className={`py-6 flex flex-col justify-between gap-4 transition-colors ${!msg.isRead ? 'bg-green-50/20 px-4 -mx-4 rounded-2xl border border-green-50' : ''}`}>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="font-bold text-slate-800 text-lg">{msg.subject}</h3>
                                                        {!msg.isRead && (
                                                            <span className="bg-green-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">New</span>
                                                        )}
                                                    </div>
                                                    <p className="text-slate-600 text-sm mb-3 italic">"{msg.message}"</p>

                                                    {/* Reply Box */}
                                                    {msg.reply ? (
                                                        <div className="mt-3 p-3.5 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-800 text-sm flex items-start gap-2.5">
                                                            <span className="text-lg">💬</span>
                                                            <div>
                                                                <span className="font-bold text-emerald-900 block text-xs mb-0.5 uppercase tracking-wide">Your Reply:</span>
                                                                <span className="italic">"{msg.reply}"</span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="mt-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                                            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Send a Reply:</label>
                                                            <div className="flex gap-2">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Type response here..."
                                                                    value={replyTexts[msg._id] || ''}
                                                                    onChange={(e) => setReplyTexts({ ...replyTexts, [msg._id]: e.target.value })}
                                                                    className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
                                                                />
                                                                <button
                                                                    onClick={async () => {
                                                                        await handleSendReply(msg._id, replyTexts[msg._id] || '');
                                                                        setReplyTexts({ ...replyTexts, [msg._id]: '' });
                                                                    }}
                                                                    disabled={actionLoading === `reply_${msg._id}`}
                                                                    className="px-4 py-2 bg-green-800 hover:bg-green-900 text-white font-bold text-xs rounded-xl shadow-sm transition disabled:opacity-50"
                                                                >
                                                                    {actionLoading === `reply_${msg._id}` ? 'Sending...' : 'Send'}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-400 mt-4 border-t pt-3">
                                                        <span>👤 <strong>Sender:</strong> {msg.name}</span>
                                                        <span>✉️ <strong>Email:</strong> {msg.email}</span>
                                                        {msg.phone && <span>📞 <strong>Phone:</strong> {msg.phone}</span>}
                                                        <span>📅 <strong>Date:</strong> {new Date(msg.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between border-t pt-3 mt-1">
                                                    {!msg.isRead ? (
                                                        <button
                                                            onClick={() => handleMarkAsRead(msg._id)}
                                                            disabled={actionLoading === msg._id}
                                                            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                                                        >
                                                            {actionLoading === msg._id ? 'Updating...' : 'Mark as Read'}
                                                        </button>
                                                    ) : (
                                                        <span className="text-emerald-600 text-xs font-bold flex items-center gap-1.5">
                                                            ✅ Processed
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </div>
            </main>

            {/* --- MODAL: ORDER DETAIL SUMMARY --- */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col border border-slate-100">
                        {/* Modal Header */}
                        <div className="p-6 bg-green-900 text-white flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold font-serif">Order Summary</h3>
                                <p className="text-xs text-green-200 mt-1">ID: #{selectedOrder._id}</p>
                            </div>
                            <button 
                                onClick={() => setSelectedOrder(null)}
                                className="w-9 h-9 rounded-full bg-green-800 text-white hover:bg-green-700 flex items-center justify-center transition text-lg"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto space-y-6 flex-grow">
                            {/* Customer details */}
                            <div>
                                <h4 className="font-bold text-slate-800 border-b pb-2 mb-3">👤 Customer Information</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-slate-400 block text-xs">Name</span>
                                        <span className="font-semibold text-slate-700">{selectedOrder.customer.name}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block text-xs">Email</span>
                                        <span className="font-semibold text-slate-700">{selectedOrder.customer.email}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block text-xs">Phone</span>
                                        <span className="font-semibold text-slate-700">{selectedOrder.customer.phone}</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block text-xs">Payment Method</span>
                                        <span className="font-bold text-emerald-700 uppercase">{selectedOrder.paymentMethod}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Shipping address */}
                            <div>
                                <h4 className="font-bold text-slate-800 border-b pb-2 mb-3">📍 Delivery Address</h4>
                                <p className="text-sm text-slate-700">
                                    {selectedOrder.customer.address.street}, {selectedOrder.customer.address.city}
                                </p>
                            </div>

                            {/* Order items */}
                            <div>
                                <h4 className="font-bold text-slate-800 border-b pb-2 mb-3">📦 Ordered Items</h4>
                                <div className="divide-y divide-slate-100">
                                    {selectedOrder.items.map((item, idx) => (
                                        <div key={idx} className="py-3 flex justify-between items-center text-sm">
                                            <div>
                                                <div className="font-semibold text-slate-800">{item.name}</div>
                                                <div className="text-xs text-slate-400">Qty: {item.quantity} x LKR {item.price.toLocaleString()}</div>
                                            </div>
                                            <div className="font-bold text-slate-800">
                                                LKR {(item.price * item.quantity).toLocaleString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Total summary */}
                            <div className="bg-slate-50 p-4 rounded-2xl flex justify-between items-center">
                                <span className="font-bold text-slate-600 text-sm">Grand Total:</span>
                                <span className="text-xl font-bold text-green-900">LKR {selectedOrder.totalAmount.toLocaleString()}</span>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 bg-slate-50 border-t flex justify-between items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-400 uppercase">Change Status:</span>
                                <select
                                    value={selectedOrder.status}
                                    onChange={(e) => handleStatusChange(selectedOrder._id, e.target.value)}
                                    className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-sm font-semibold focus:outline-none"
                                >
                                    <option value="processing">Processing</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl transition text-sm"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminDashboard;
