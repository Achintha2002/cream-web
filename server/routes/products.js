import express from 'express';
import Product from '../models/Product.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// GET all products (with optional category filter)
router.get('/', async (req, res) => {
    try {
        const { category, featured, search } = req.query;
        let filter = {};

        if (category) filter.category = category;
        if (featured === 'true') filter.isFeatured = true;
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const products = await Product.find(filter).sort({ createdAt: -1 });
        res.json({ success: true, count: products.length, data: products });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
        res.json({ success: true, data: product });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// POST create product (admin only)
router.post('/', protect, authorize('admin'), async (req, res) => {
    try {
        const { name, description, price, image, category, isFeatured, stock } = req.body;

        if (!name || !description || !price || !image || !category) {
            return res.status(400).json({ success: false, message: 'Please provide all required fields' });
        }

        const product = new Product({ name, description, price, image, category, isFeatured, stock });
        const savedProduct = await product.save();
        res.status(201).json({ success: true, data: savedProduct });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// PUT update product (admin only)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
        res.json({ success: true, data: product });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// DELETE product (admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
        res.json({ success: true, message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;
