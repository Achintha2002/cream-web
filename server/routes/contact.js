import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// POST - Submit contact form
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ success: false, message: 'Name, email, subject, and message are required' });
        }

        const contact = new Contact({ name, email, phone, subject, message });
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
router.get('/', async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json({ success: true, count: messages.length, data: messages });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// PUT - Mark message as read
router.put('/:id/read', async (req, res) => {
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

export default router;
