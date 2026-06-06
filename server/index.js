import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
// Replace <YOUR_MONGODB_URI> with your actual connection string from MongoDB Atlas
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/raani_cream';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Routes
// app.use('/api/products', productRoutes);

// Basic Route for testing
app.get('/', (req, res) => {
    res.send('Raani Cream API is running');
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
