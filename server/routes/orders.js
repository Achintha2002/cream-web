import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// POST - Place a new order
router.post('/', async (req, res) => {
    try {
        const { customer, items, paymentMethod, notes } = req.body;

        if (!customer || !items || items.length === 0) {
            return res.status(400).json({ success: false, message: 'Customer info and items are required' });
        }

        const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const order = new Order({ customer, items, totalAmount, paymentMethod, notes });
        const savedOrder = await order.save();

        res.status(201).json({
            success: true,
            message: 'Order placed successfully!',
            data: savedOrder
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET all orders (admin)
router.get('/', async (req, res) => {
    try {
        const { status } = req.query;
        let filter = {};
        if (status) filter.status = status;

        const orders = await Order.find(filter)
            .populate('items.product', 'name price image')
            .sort({ createdAt: -1 });

        res.json({ success: true, count: orders.length, data: orders });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET single order
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('items.product');
        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
        res.json({ success: true, data: order });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// PUT - Update order status (admin)
router.put('/:id/status', async (req, res) => {
    try {
        const { status, paymentStatus } = req.body;
        const update = {};
        if (status) update.status = status;
        if (paymentStatus) update.paymentStatus = paymentStatus;

        const order = await Order.findByIdAndUpdate(req.params.id, update, { new: true });
        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
        res.json({ success: true, data: order });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;
