import express from 'express';
import Order from '../models/Order.js';
import { sendEmail } from '../utils/sendEmail.js';

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

        // 🌟 Send Order Confirmation Email to Customer
        try {
            const itemsHtml = items.map(item => `
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${item.name}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: center;">${item.quantity}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: right;">LKR ${item.price.toLocaleString()}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: right;">LKR ${(item.price * item.quantity).toLocaleString()}</td>
                </tr>
            `).join('');

            const emailHtml = `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a365d; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                    <div style="background-color: #14532d; padding: 30px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-family: 'Georgia', serif; font-size: 28px;">🌿 RAANI Skincare</h1>
                        <p style="color: #d1fae5; margin: 5px 0 0 0; font-size: 14px;">Pure Organic Wellness</p>
                    </div>
                    <div style="padding: 30px; background-color: #ffffff;">
                        <h2 style="color: #14532d; font-family: 'Georgia', serif; margin-top: 0;">Order Confirmed!</h2>
                        <p>Hi <strong>${customer.name}</strong>,</p>
                        <p>Thank you for choosing RAANI. We've received your order and are processing it now. Here is a summary of your order:</p>
                        
                        <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; padding: 15px; border-radius: 8px; margin-bottom: 25px;">
                            <p style="margin: 0; font-size: 14px; color: #166534;"><strong>Order ID:</strong> ${savedOrder._id}</p>
                            <p style="margin: 5px 0 0 0; font-size: 14px; color: #166534;"><strong>Status:</strong> Processing</p>
                            <p style="margin: 5px 0 0 0; font-size: 14px; color: #166534;"><strong>Payment Method:</strong> ${paymentMethod.toUpperCase()} (Cash on Delivery)</p>
                        </div>

                        <h3 style="color: #14532d; border-bottom: 2px solid #f0fdf4; padding-bottom: 8px;">Order Details</h3>
                        <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
                            <thead>
                                <tr style="background-color: #f8fafc; color: #475569;">
                                    <th style="padding: 10px; text-align: left;">Product</th>
                                    <th style="padding: 10px; text-align: center;">Qty</th>
                                    <th style="padding: 10px; text-align: right;">Price</th>
                                    <th style="padding: 10px; text-align: right;">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${itemsHtml}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="3" style="padding: 15px 10px 10px 10px; font-weight: bold; text-align: right;">Subtotal:</td>
                                    <td style="padding: 15px 10px 10px 10px; font-weight: bold; text-align: right; color: #14532d;">LKR ${totalAmount.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td colspan="3" style="padding: 5px 10px; font-weight: bold; text-align: right;">Shipping:</td>
                                    <td style="padding: 5px 10px; font-weight: bold; text-align: right; color: #15803d;">Free</td>
                                </tr>
                                <tr>
                                    <td colspan="3" style="padding: 10px; font-weight: bold; text-align: right; border-top: 2px solid #e2e8f0; font-size: 18px;">Grand Total:</td>
                                    <td style="padding: 10px; font-weight: bold; text-align: right; border-top: 2px solid #e2e8f0; font-size: 18px; color: #14532d;">LKR ${totalAmount.toLocaleString()}</td>
                                </tr>
                            </tfoot>
                        </table>

                        <h3 style="color: #14532d; border-bottom: 2px solid #f0fdf4; padding-bottom: 8px;">Delivery Address</h3>
                        <p style="margin: 5px 0;"><strong>Street:</strong> ${customer.address.street}</p>
                        <p style="margin: 5px 0;"><strong>City:</strong> ${customer.address.city}</p>
                        <p style="margin: 5px 0;"><strong>Phone:</strong> ${customer.phone}</p>

                        <div style="margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center; font-size: 12px; color: #94a3b8;">
                            <p style="margin: 0;">RAANI Skincare Colombo, Sri Lanka</p>
                            <p style="margin: 5px 0 0 0;">Need help? Email us at hello@raani.lk</p>
                        </div>
                    </div>
                </div>
            `;

            await sendEmail({
                to: customer.email,
                subject: `🌿 Order Confirmed - RAANI Skincare (ID: ${savedOrder._id.toString().substring(0, 8)})`,
                html: emailHtml
            });
        } catch (mailErr) {
            console.error('Failed to send order email, but order was saved successfully:', mailErr);
        }

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
