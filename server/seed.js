import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import User from './models/User.js';

dotenv.config();

const products = [
    {
        name: 'Raani Royal Cream',
        description: 'Our signature luxury cream enriched with 24K gold particles and rare botanical extracts. Deeply nourishes and brightens skin for a radiant glow.',
        price: 2800,
        image: '/images/mockup_royal.png',
        category: 'Face Cream',
        isFeatured: true,
        stock: 50,
    },
    {
        name: 'Ethereal Glow Serum',
        description: 'Lightweight yet powerful serum infused with hyaluronic acid and vitamin C. Reduces dark spots and gives skin an ethereal luminous finish.',
        price: 3200,
        image: '/images/mockup_ethereal.png',
        category: 'Serum',
        isFeatured: true,
        stock: 35,
    },
    {
        name: 'Organic Night Repair Cream',
        description: 'Formulated with 100% organic ingredients. Works overnight to repair, restore, and rejuvenate tired skin. Wake up with a fresh, dewy complexion.',
        price: 2500,
        image: '/images/mockup_night_organic.png',
        category: 'Night Cream',
        isFeatured: true,
        stock: 40,
    },
    {
        name: 'Minimalist Daily Moisturizer',
        description: 'Clean, minimal formula with just the essentials. Lightweight daily moisturizer that keeps skin hydrated without clogging pores. Perfect for sensitive skin.',
        price: 1800,
        image: '/images/mockup_minimalist.png',
        category: 'Moisturizer',
        isFeatured: false,
        stock: 60,
    },
    {
        name: 'Pure Organic Cream',
        description: 'Pure and natural formulation with aloe vera, shea butter, and coconut oil. Gentle enough for all skin types including sensitive and baby skin.',
        price: 1500,
        image: '/images/mockup_organic.png',
        category: 'Face Cream',
        isFeatured: false,
        stock: 80,
    },
];

const seedDB = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/raani_cream';
        await mongoose.connect(MONGODB_URI);
        console.log('✅ MongoDB Connected');

        // Clear existing products
        await Product.deleteMany({});
        console.log('🗑️  Existing products cleared');

        // Insert new products
        const inserted = await Product.insertMany(products);
        console.log(`🌱 ${inserted.length} products seeded successfully!`);

        // Seed Admin User
        console.log('🌱 Seeding Admin User...');
        await User.deleteMany({ email: 'admin@raani.lk' });
        
        const adminUser = await User.create({
            name: 'RAANI Admin',
            email: 'admin@raani.lk',
            password: 'adminpassword123',
            role: 'admin'
        });
        console.log(`🌿 Default Admin User created: ${adminUser.email}`);

    } catch (err) {
        console.error('❌ Seed Error:', err.message);
    } finally {
        await mongoose.connection.close();
        console.log('🔌 MongoDB Disconnected');
        process.exit(0);
    }
};

seedDB();
