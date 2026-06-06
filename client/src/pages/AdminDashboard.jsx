import { useEffect, useState } from 'react';
import { ordersAPI, contactAPI, productsAPI } from '../services/api';

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [messages, setMessages] = useState([]);
    const [productsCount, setProductsCount] = useState(0);
    const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'messages'
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null); // ID of active operation
    const [error, setError] = useState(null);

    // Fetch dashboard data
    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [ordersRes, messagesRes, productsRes] = await Promise.all([
                ordersAPI.getAll(),
                contactAPI.getAll(),
                productsAPI.getAll()
            ]);

            if (ordersRes.success) setOrders(ordersRes.data);
            if (messagesRes.success) setMessages(messagesRes.data);
            if (productsRes.success) setProductsCount(productsRes.count || productsRes.data.length);
            setError(null);
        } catch (err) {
            console.error('Error fetching admin data:', err);
            setError('Failed to fetch dashboard data. Please make sure the server is running.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    // Handle Order Status Update
    const handleStatusChange = async (orderId, newStatus) => {
        try {
            setActionLoading(orderId);
            const res = await ordersAPI.updateStatus(orderId, { status: newStatus });
            if (res.success) {
                setOrders(orders.map(order => order._id === orderId ? { ...order, status: newStatus } : order));
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

    // Calculations
    const totalOrders = orders.length;
    const totalRevenue = orders
        .filter(order => order.status !== 'cancelled')
        .reduce((sum, order) => sum + order.totalAmount, 0);
    const unreadMessages = messages.filter(msg => !msg.isRead).length;

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
        <div className="min-h-screen pt-28 pb-16 bg-slate-50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 font-serif">🌿 RAANI Admin Dashboard</h1>
                        <p className="text-slate-500 mt-1">Manage orders, user inquiries, and monitor store stats</p>
                    </div>
                    <button 
                        onClick={fetchDashboardData}
                        className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl shadow-sm transition flex items-center gap-2"
                    >
                        🔄 Refresh Data
                    </button>
                </div>

                {error && (
                    <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 font-medium">
                        ⚠️ {error}
                    </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Revenue Card */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl">
                            💰
                        </div>
                        <div>
                            <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider">Total Revenue</span>
                            <span className="text-2xl font-bold text-slate-800">LKR {totalRevenue.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Orders Card */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl">
                            📦
                        </div>
                        <div>
                            <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider">Total Orders</span>
                            <span className="text-2xl font-bold text-slate-800">{totalOrders}</span>
                        </div>
                    </div>

                    {/* Messages Card */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl">
                            ✉️
                        </div>
                        <div>
                            <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider">Unread Messages</span>
                            <span className="text-2xl font-bold text-slate-800">{unreadMessages}</span>
                        </div>
                    </div>

                    {/* Products Card */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl">
                            🧴
                        </div>
                        <div>
                            <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider">Products</span>
                            <span className="text-2xl font-bold text-slate-800">{productsCount} Active</span>
                        </div>
                    </div>
                </div>

                {/* Main Tabs Selection */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="flex border-b border-slate-100 bg-slate-50/50 p-2">
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`flex-1 py-4 px-6 font-bold rounded-2xl transition flex items-center justify-center gap-2 ${activeTab === 'orders' ? 'bg-white text-green-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            📦 Orders Management ({orders.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('messages')}
                            className={`flex-1 py-4 px-6 font-bold rounded-2xl transition flex items-center justify-center gap-2 ${activeTab === 'messages' ? 'bg-white text-green-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            ✉️ Customer Inquiries ({unreadMessages} unread)
                        </button>
                    </div>

                    <div className="p-6">
                        {/* Tab Content: Orders */}
                        {activeTab === 'orders' && (
                            <div className="overflow-x-auto">
                                {orders.length === 0 ? (
                                    <div className="text-center py-12 text-slate-400">
                                        No orders placed yet.
                                    </div>
                                ) : (
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-slate-100 text-slate-400 text-sm font-semibold">
                                                <th className="py-4 px-4">Order ID</th>
                                                <th className="py-4 px-4">Customer</th>
                                                <th className="py-4 px-4">Items</th>
                                                <th className="py-4 px-4">Total</th>
                                                <th className="py-4 px-4">Status</th>
                                                <th className="py-4 px-4 text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 text-slate-700">
                                            {orders.map(order => (
                                                <tr key={order._id} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="py-4 px-4 font-mono text-xs font-bold text-slate-400">
                                                        #{order._id.substring(0, 8)}...
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <div className="font-semibold text-slate-800">{order.customer.name}</div>
                                                        <div className="text-xs text-slate-400">{order.customer.phone}</div>
                                                        <div className="text-xs text-slate-400">{order.customer.address.city}</div>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <div className="space-y-1">
                                                            {order.items.map((item, idx) => (
                                                                <div key={idx} className="text-xs">
                                                                    • {item.name} <span className="text-slate-400">(x{item.quantity})</span>
                                                                </div>
                                                            ))}
                                                        </div>
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
                                )}
                            </div>
                        )}

                        {/* Tab Content: Messages */}
                        {activeTab === 'messages' && (
                            <div className="space-y-6">
                                {messages.length === 0 ? (
                                    <div className="text-center py-12 text-slate-400">
                                        No messages received yet.
                                    </div>
                                ) : (
                                    <div className="divide-y divide-slate-100">
                                        {messages.map(msg => (
                                            <div key={msg._id} className={`py-6 flex flex-col md:flex-row justify-between items-start gap-4 transition-colors ${!msg.isRead ? 'bg-green-50/20 px-4 -mx-4 rounded-2xl border border-green-50' : ''}`}>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="font-bold text-slate-800 text-lg">{msg.subject}</h3>
                                                        {!msg.isRead && (
                                                            <span className="bg-green-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">New</span>
                                                        )}
                                                    </div>
                                                    <p className="text-slate-600 text-sm mb-3 italic">"{msg.message}"</p>
                                                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                                                        <span>👤 <strong>Sender:</strong> {msg.name}</span>
                                                        <span>✉️ <strong>Email:</strong> {msg.email}</span>
                                                        {msg.phone && <span>📞 <strong>Phone:</strong> {msg.phone}</span>}
                                                        <span>📅 <strong>Date:</strong> {new Date(msg.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                                <div className="md:self-center">
                                                    {!msg.isRead ? (
                                                        <button
                                                            onClick={() => handleMarkAsRead(msg._id)}
                                                            disabled={actionLoading === msg._id}
                                                            className="px-4 py-2 bg-green-800 hover:bg-green-900 text-white font-bold text-xs rounded-xl shadow-sm transition whitespace-nowrap"
                                                        >
                                                            {actionLoading === msg._id ? 'Updating...' : 'Mark as Read'}
                                                        </button>
                                                    ) : (
                                                        <span className="text-slate-400 text-xs font-bold flex items-center gap-1.5">
                                                            ✅ Message Read
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
