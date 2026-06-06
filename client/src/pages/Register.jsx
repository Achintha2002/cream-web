import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!name || !email || !password || !confirmPassword) {
            setStatus('error');
            setErrorMsg('Please fill in all fields.');
            return;
        }

        if (password.length < 6) {
            setStatus('error');
            setErrorMsg('Password must be at least 6 characters.');
            return;
        }

        if (password !== confirmPassword) {
            setStatus('error');
            setErrorMsg('Passwords do not match.');
            return;
        }

        try {
            setStatus('loading');
            const res = await register(name, email, password);
            if (res.success) {
                setStatus('success');
                navigate('/');
            }
        } catch (err) {
            setStatus('error');
            setErrorMsg(err.message || 'Registration failed. Email might already be registered.');
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
                    <h2 className="text-3xl font-serif font-bold text-green-900 mt-3">Join RAANI</h2>
                    <p className="text-gray-500 text-sm mt-2">Create an account to start your clean beauty journey</p>
                </div>

                {status === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 font-medium text-sm flex items-center gap-2">
                        ❌ {errorMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-600 font-semibold mb-1 text-xs uppercase tracking-wider">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full bg-green-50/50 border border-green-100 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                            placeholder="Jane Doe"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 font-semibold mb-1 text-xs uppercase tracking-wider">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-green-50/50 border border-green-100 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                            placeholder="hello@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 font-semibold mb-1 text-xs uppercase tracking-wider">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-green-50/50 border border-green-100 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                            placeholder="Min 6 characters"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 font-semibold mb-1 text-xs uppercase tracking-wider">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full bg-green-50/50 border border-green-100 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                            placeholder="Repeat password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full py-4 bg-green-800 text-white font-bold rounded-xl hover:bg-green-900 transition shadow-lg flex items-center justify-center gap-2 transform hover:-translate-y-0.5 text-lg"
                    >
                        {status === 'loading' ? (
                            <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Registering...</>
                        ) : 'Create Account 🌿'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-500 border-t border-green-50 pt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-green-700 font-bold hover:underline">
                        Log in here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
