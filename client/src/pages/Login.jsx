import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'
    const [errorMsg, setErrorMsg] = useState('');

    // Redirect user to their previous path or back to home
    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setStatus('error');
            setErrorMsg('Please fill in all fields.');
            return;
        }

        try {
            setStatus('loading');
            const res = await login(email, password);
            if (res.success) {
                setStatus('success');
                navigate(from, { replace: true });
            }
        } catch (err) {
            setStatus('error');
            setErrorMsg(err.message || 'Invalid email or password.');
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 flex flex-col justify-center items-center bg-green-50/30 relative overflow-hidden px-4">
            {/* Design blur shapes */}
            <div className="absolute top-20 left-10 w-80 h-80 bg-green-200 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-30"></div>

            <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl border border-green-100 relative z-10">
                <div className="text-center mb-8">
                    <span className="text-4xl text-green-700">🌿</span>
                    <h2 className="text-3xl font-serif font-bold text-green-900 mt-3">Welcome Back</h2>
                    <p className="text-gray-500 text-sm mt-2">Log in to manage your orders & skincare routine</p>
                </div>

                {status === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 font-medium text-sm flex items-center gap-2">
                        ❌ {errorMsg}
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

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-gray-600 font-semibold text-xs uppercase tracking-wider">Password</label>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                            <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Logging in...</>
                        ) : 'Log In 🌿'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-500 border-t border-green-50 pt-6">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-green-700 font-bold hover:underline">
                        Create one now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
