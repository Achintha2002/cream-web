import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'raani_secret_jwt_key_123456';
const JWT_EXPIRE = '30d';

// Generate Token Utility
const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRE,
    });
};

// @desc    Register user
// @route   POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            role: role || 'user'
        });

        // Create token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// @desc    Login user
// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email & password
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide an email and password' });
        }

        // Check for user
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Create token
        const token = generateToken(user._id);

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
router.get('/me', async (req, res) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'No user found with this id' });
        }

        res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }
});

// @desc    Update user profile
// @route   PUT /api/auth/me
router.put('/me', async (req, res) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        // If password is provided, update it
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            success: true,
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role
            }
        });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// @desc    Get all users (admin only)
// @route   GET /api/auth/users
router.get('/users', protect, authorize('admin'), async (req, res) => {
    try {
        const users = await User.find({}).select('-password').sort({ createdAt: -1 });
        res.json({ success: true, count: users.length, data: users });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// @desc    Forgot password
// @route   POST /api/auth/forgotpassword
router.post('/forgotpassword', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'There is no user with that email' });
        }

        // Get reset token
        const resetToken = user.getResetPasswordToken();

        await user.save({ validateBeforeSave: false });

        // Create reset url
        // NOTE: Make sure CLIENT_URL is set in .env (e.g. http://localhost:5173)
        const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
        const resetUrl = `${clientUrl}/resetpassword/${resetToken}`;

        const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Password reset token',
                message
            });

            res.status(200).json({ success: true, data: 'Email sent' });
        } catch (err) {
            console.error(err);
            
            // If email fails, for development we can still return the reset url in response or console log it
            // We KEEP the token in the database so the development URL actually works!
            console.log(`Reset URL for development: ${resetUrl}`);
            // Returning success false but with URL in dev (remove in prod)
            res.status(500).json({ success: false, message: 'Email could not be sent', devResetUrl: resetUrl });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// @desc    Reset password
// @route   PUT /api/auth/resetpassword/:resettoken
router.put('/resetpassword/:resettoken', async (req, res) => {
    try {
        // Get hashed token
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid or expired token' });
        }

        // Set new password
        if (!req.body.password) {
            return res.status(400).json({ success: false, message: 'Please provide a new password' });
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;
