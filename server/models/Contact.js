import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    reply: { type: String, trim: true },
    isRead: { type: Boolean, default: false },
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;
