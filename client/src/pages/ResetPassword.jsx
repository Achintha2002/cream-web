import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const ResetPassword = () => {
    const { resettoken } = useParams();
    const navigate = useNavigate();
    const { login } = useAuth(); // If we want to auto-login, but usually we just redirect to login
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setStatus('error');
            setMessage('Passwords do not match.');
            return;
        }

        if (password.length < 6) {
            setStatus('error');
            setMessage('Password must be at least 6 characters long.');
            return;
        }

        try {
            setStatus('loading');
            const res = await authAPI.resetPassword(resettoken, password);
            setStatus('success');
            setMessage('Password reset successful! You can now log in.');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            setStatus('error');
            setMessage(err.message || 'Invalid or expired token.');
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 flex flex-col justify-center items-center bg-green-50/30 relative overflow-hidden px-4">
            <div className="absolute top-20 left-10 w-80 h-80 bg-green-200 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-30"></div>

            <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl border border-green-100 relative z-10">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-serif font-bold text-green-900 mt-3">Reset Password</h2>
                    <p className="text-gray-500 text-sm mt-2">Enter your new password below.</p>
                </div>

                {status === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 font-medium text-sm flex items-center gap-2">
                        ❌ {message}
                    </div>
                )}
                {status === 'success' && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-medium text-sm flex items-center gap-2">
                        ✅ {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-600 font-semibold mb-2 text-xs uppercase tracking-wider">New Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-green-50/50 border border-green-100 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                            placeholder="••••••••"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-semibold mb-2 text-xs uppercase tracking-wider">Confirm New Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full bg-green-50/50 border border-green-100 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full py-4 bg-green-800 text-white font-bold rounded-xl hover:bg-green-900 transition shadow-lg flex items-center justify-center gap-2 transform hover:-translate-y-0.5 text-lg"
                    >
                        {status === 'loading' ? (
                            <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Resetting...</>
                        ) : 'Reset Password'}
                    </button>
                </form>
                <div className="mt-8 text-center text-sm text-gray-500 border-t border-green-50 pt-6">
                    <Link to="/login" className="text-green-700 font-bold hover:underline">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
