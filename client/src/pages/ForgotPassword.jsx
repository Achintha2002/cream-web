import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../services/api';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null); // 'idle' | 'loading' | 'success' | 'error'
    const [message, setMessage] = useState('');
    const [devUrl, setDevUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setStatus('error');
            setMessage('Please enter your email address.');
            return;
        }

        try {
            setStatus('loading');
            const res = await authAPI.forgotPassword(email);
            setStatus('success');
            if (res.devResetUrl) {
                setMessage('Development Mode: Email sending failed (no credentials), but you can use this link to reset your password:');
                setDevUrl(res.devResetUrl);
            } else {
                setMessage('Reset link sent to your email. Please check your inbox.');
                setDevUrl('');
            }
        } catch (err) {
            console.error('Forgot password error:', err);
            setStatus('error');
            setMessage(err instanceof Error ? err.message : String(err));
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 flex flex-col justify-center items-center bg-green-50/30 relative overflow-hidden px-4">
            <div className="absolute top-20 left-10 w-80 h-80 bg-green-200 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-30"></div>

            <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl border border-green-100 relative z-10">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-serif font-bold text-green-900 mt-3">Forgot Password</h2>
                    <p className="text-gray-500 text-sm mt-2">Enter your email and we'll send you a link to reset your password.</p>
                </div>

                {status === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 font-medium text-sm flex flex-col gap-2 overflow-auto break-all">
                        ❌ {message}
                    </div>
                )}
                {status === 'success' && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-medium text-sm flex flex-col gap-2 overflow-auto break-all">
                        <div className="flex items-center gap-2">✅ {message}</div>
                        {devUrl && (
                            <Link to={new URL(devUrl).pathname} className="mt-2 inline-block bg-green-700 text-white px-4 py-2 rounded-lg text-center hover:bg-green-800 transition shadow-sm font-bold">
                                Click here to Reset Password
                            </Link>
                        )}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-600 font-semibold mb-2 text-xs uppercase tracking-wider">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-green-50/50 border border-green-100 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                            placeholder="hello@example.com"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full py-4 bg-green-800 text-white font-bold rounded-xl hover:bg-green-900 transition shadow-lg flex items-center justify-center gap-2 transform hover:-translate-y-0.5 text-lg"
                    >
                        {status === 'loading' ? (
                            <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Sending...</>
                        ) : 'Send Reset Link'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-500 border-t border-green-50 pt-6">
                    Remembered your password?{' '}
                    <Link to="/login" className="text-green-700 font-bold hover:underline">
                        Log In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
