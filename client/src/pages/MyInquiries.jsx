import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { contactAPI } from '../services/api';

const MyInquiries = () => {
    const { user } = useAuth();
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const [formData, setFormData] = useState({
        subject: '',
        message: '',
        phone: ''
    });

    const fetchMyInquiries = async (silent = false) => {
        try {
            if (!silent) setLoading(true);
            const res = await contactAPI.getMy();
            if (res.success) {
                setInquiries(res.data);
            }
        } catch (err) {
            console.error('Error fetching inquiries:', err);
            if (!silent) setError('Failed to fetch your inquiries history.');
        } finally {
            if (!silent) setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchMyInquiries();

            const pollInterval = setInterval(() => {
                fetchMyInquiries(true);
            }, 8000);

            return () => clearInterval(pollInterval);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.subject || !formData.message) {
            alert('Subject and Message are required.');
            return;
        }

        try {
            setSubmitLoading(true);
            setError(null);
            
            // Auto fill name and email from authenticated user context
            const payload = {
                name: user.name,
                email: user.email,
                phone: formData.phone,
                subject: formData.subject,
                message: formData.message
            };

            const res = await contactAPI.send(payload);
            if (res.success) {
                setSuccessMessage('🎉 Inquiry submitted successfully! Our admin will review it.');
                setFormData({ subject: '', message: '', phone: '' });
                // Refresh list
                fetchMyInquiries();
                
                // Clear success message after 5 seconds
                setTimeout(() => setSuccessMessage(''), 5000);
            }
        } catch (err) {
            setError(err.message || 'Failed to submit inquiry.');
        } finally {
            setSubmitLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen pt-28 pb-16 flex items-center justify-center bg-slate-50">
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md text-center max-w-sm">
                    <p className="text-slate-600 mb-5 font-medium">Please log in to submit and track your inquiries.</p>
                    <a href="/login" className="px-6 py-2.5 bg-green-800 text-white rounded-xl font-bold hover:bg-green-900 transition">Log In</a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-28 pb-16 bg-slate-50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 font-serif">✉️ Help Center & Inquiries</h1>
                    <p className="text-slate-500 mt-1">Hello, {user.name}. Feel free to ask any questions or send feedback to our expert team.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Inquiry submission form */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm lg:col-span-2">
                        <h3 className="font-serif font-bold text-slate-800 text-lg mb-5 pb-3 border-b">📩 Submit an Inquiry</h3>
                        
                        {successMessage && (
                            <div className="mb-5 p-4 bg-green-50 border border-green-200 rounded-2xl text-green-700 text-sm font-medium">
                                {successMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-slate-400 font-semibold mb-1 text-xs uppercase tracking-wider">Your Name</label>
                                <input
                                    type="text"
                                    disabled
                                    value={user.name}
                                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-500 cursor-not-allowed font-semibold"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-400 font-semibold mb-1 text-xs uppercase tracking-wider">Your Email</label>
                                <input
                                    type="text"
                                    disabled
                                    value={user.email}
                                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-500 cursor-not-allowed font-semibold"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-600 font-semibold mb-1 text-xs uppercase tracking-wider">Phone Number (Optional)</label>
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                                    placeholder="+94 77 xxx xxxx"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-600 font-semibold mb-1 text-xs uppercase tracking-wider">Subject / Topic</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 font-semibold"
                                    placeholder="Product ingredients question"
                                />
                            </div>

                            <div>
                                <label className="block text-slate-600 font-semibold mb-1 text-xs uppercase tracking-wider">Message</label>
                                <textarea
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 min-h-[120px]"
                                    placeholder="Type your question or query here..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitLoading}
                                className="w-full py-3 bg-green-800 hover:bg-green-900 text-white font-bold rounded-xl shadow transition text-sm flex items-center justify-center gap-2"
                            >
                                {submitLoading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : '🌿 Send Inquiry'}
                            </button>
                        </form>
                    </div>

                    {/* Inquiry History */}
                    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm lg:col-span-3">
                        <h3 className="font-serif font-bold text-slate-800 text-lg mb-5 pb-3 border-b">📋 Inquiry History</h3>

                        {loading ? (
                            <div className="py-12 flex justify-center items-center">
                                <div className="w-8 h-8 border-2 border-green-800 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : inquiries.length === 0 ? (
                            <div className="text-center py-16 text-slate-400 text-sm">
                                You have not submitted any inquiries yet.
                            </div>
                        ) : (
                            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                                {inquiries.map((inq) => (
                                    <div key={inq._id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-between gap-3 hover:border-slate-200 transition">
                                        <div>
                                            <div className="flex justify-between items-start gap-4 mb-2">
                                                <h4 className="font-bold text-slate-800 text-sm">{inq.subject}</h4>
                                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${inq.isRead ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                                    {inq.isRead ? 'Reviewed' : 'Pending'}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-600 italic">"{inq.message}"</p>
                                            {inq.phone && <p className="text-[11px] text-slate-500 mt-1 font-medium">📞 {inq.phone}</p>}

                                            {/* Admin Reply Display */}
                                            {inq.reply && (
                                                <div className="mt-2.5 p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-[11px] flex items-start gap-2">
                                                    <span className="text-xs">💬</span>
                                                    <div>
                                                        <span className="font-bold text-emerald-950 block text-[9px] uppercase tracking-wide mb-0.5">Admin Response:</span>
                                                        <span className="italic">"{inq.reply}"</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex justify-between items-center text-[10px] text-slate-400 border-t pt-2">
                                            <span>📩 ID: #{inq._id.substring(0, 8)}</span>
                                            <span>📅 {new Date(inq.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MyInquiries;
