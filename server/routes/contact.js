import express from 'express';
import Contact from '../models/Contact.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

import jwt from 'jsonwebtoken';

// Helper to optionally get user from token
const getOptionalUser = (req) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer')) {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'raani_secret_jwt_key_123456');
            return decoded.id;
        }
    } catch (err) {
        // Log error silently, user is just guest
    }
    return null;
};

// GET logged-in user's own inquiries
router.get('/my', protect, async (req, res) => {
    try {
        const inquiries = await Contact.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json({ success: true, count: inquiries.length, data: inquiries });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// POST - Submit contact form (authenticated or guest)
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ success: false, message: 'Name, email, subject, and message are required' });
        }

        const userId = getOptionalUser(req);
        const contact = new Contact({ 
            user: userId || undefined,
            name, 
            email, 
            phone, 
            subject, 
            message 
        });
        await contact.save();

        res.status(201).json({
            success: true,
            message: 'Your message has been received. We will contact you soon!'
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET all messages (admin)
router.get('/', protect, authorize('admin'), async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json({ success: true, count: messages.length, data: messages });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// PUT - Mark message as read
router.put('/:id/read', protect, authorize('admin'), async (req, res) => {
    try {
        const message = await Contact.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        );
        if (!message) return res.status(404).json({ success: false, message: 'Message not found' });
        res.json({ success: true, data: message });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// PUT - Reply to message (admin)
router.put('/:id/reply', protect, authorize('admin'), async (req, res) => {
    try {
        const { reply } = req.body;
        if (!reply) return res.status(400).json({ success: false, message: 'Reply content is required' });

        const message = await Contact.findByIdAndUpdate(
            req.params.id,
            { reply, isRead: true },
            { new: true }
        );
        if (!message) return res.status(404).json({ success: false, message: 'Message not found' });
        res.json({ success: true, data: message });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;
