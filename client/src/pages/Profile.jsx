import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { authAPI } from '../services/api';

const Profile = () => {
    const { user, logout, updateUser } = useAuth();
    
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    if (!user) {
        return (
            <div className="min-h-screen pt-36 pb-16 flex items-center justify-center bg-slate-50">
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md text-center max-w-sm">
                    <p className="text-slate-600 mb-5 font-medium">Please log in to view your profile.</p>
                    <Link to="/login" className="px-6 py-2.5 bg-green-800 text-white rounded-xl font-bold hover:bg-green-900 transition">Log In</Link>
                </div>
            </div>
        );
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        if (formData.password !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match.' });
            return;
        }

        try {
            setLoading(true);
            const updatePayload = {
                name: formData.name,
                email: formData.email,
            };
            
            if (formData.password) {
                updatePayload.password = formData.password;
            }

            const res = await authAPI.updateMe(updatePayload);
            if (res.success) {
                updateUser(res.user);
                setMessage({ type: 'success', text: 'Profile updated successfully!' });
                setIsEditing(false);
                setFormData(prev => ({ ...prev, password: '', confirmPassword: '' })); // clear passwords
            }
        } catch (err) {
            setMessage({ type: 'error', text: err.message || 'Failed to update profile.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-36 pb-16 bg-slate-50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 font-serif">My Profile</h1>
                    <p className="text-slate-500 mt-1">Manage your personal information and account settings.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Column: Avatar & Quick Actions */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 text-center">
                            <div className="w-24 h-24 mx-auto bg-green-100 text-green-800 rounded-full flex items-center justify-center text-3xl font-bold font-serif mb-4 shadow-inner">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <h2 className="text-xl font-bold text-slate-800 mb-1">{user.name}</h2>
                            <p className="text-sm text-slate-500 mb-6">{user.email}</p>

                            <div className="space-y-2">
                                <button 
                                    onClick={() => {
                                        setIsEditing(!isEditing);
                                        setMessage({ type: '', text: '' });
                                    }}
                                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition text-sm font-semibold border border-green-100"
                                >
                                    {isEditing ? 'Cancel Editing' : '✏️ Edit Profile'}
                                </button>
                                <Link to="/my-inquiries" className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-50 text-slate-700 rounded-xl hover:bg-slate-100 transition text-sm font-semibold border border-slate-100">
                                    📋 My Inquiries
                                </Link>
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="w-full flex items-center justify-center gap-2 py-2.5 bg-amber-50 text-amber-700 rounded-xl hover:bg-amber-100 transition text-sm font-semibold border border-amber-100">
                                        👑 Admin Dashboard
                                    </Link>
                                )}
                                <button
                                    onClick={logout}
                                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition text-sm font-semibold border border-red-100"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                    </svg>
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                            <h3 className="font-serif font-bold text-slate-800 text-lg mb-5 pb-3 border-b border-slate-100">Personal Information</h3>
                            
                            {message.text && (
                                <div className={`mb-5 p-4 rounded-xl text-sm font-medium border ${message.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                    {message.text}
                                </div>
                            )}

                            {!isEditing ? (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-slate-400 font-semibold mb-1 text-xs uppercase tracking-wider">Full Name</label>
                                        <div className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm text-slate-700 font-medium">
                                            {user.name}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-slate-400 font-semibold mb-1 text-xs uppercase tracking-wider">Email Address</label>
                                        <div className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm text-slate-700 font-medium">
                                            {user.email}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-slate-400 font-semibold mb-1 text-xs uppercase tracking-wider">Account Type</label>
                                        <div className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm text-slate-700 font-medium capitalize">
                                            {user.role}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleUpdate} className="space-y-4">
                                    <div>
                                        <label className="block text-slate-600 font-semibold mb-1 text-xs uppercase tracking-wider">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 font-semibold"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-slate-600 font-semibold mb-1 text-xs uppercase tracking-wider">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 font-semibold"
                                        />
                                    </div>
                                    
                                    <div className="pt-4 border-t border-slate-100">
                                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">Change Password (Optional)</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <input
                                                    type="password"
                                                    placeholder="New Password"
                                                    value={formData.password}
                                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="password"
                                                    placeholder="Confirm New Password"
                                                    value={formData.confirmPassword}
                                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 flex justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="px-6 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition text-sm"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="px-6 py-2.5 bg-green-800 text-white rounded-xl font-bold hover:bg-green-900 transition text-sm flex items-center gap-2"
                                        >
                                            {loading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
