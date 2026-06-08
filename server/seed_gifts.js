import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/raani_cream';

const giftProducts = [
    {
        name: 'Royal Rose Radiance Set',
        description: 'A luxurious gift box featuring our deepest red and gold packaging. Includes full-size rose elixirs, serums, and our signature floral face cream for the ultimate glowing complexion.',
        price: 18500,
        category: 'Gifts',
        image: '/images/gift_1.png',
        stock: 15,
        isFeatured: true
    },
    {
        name: 'Veda Luxe Golden Glow Collection',
        description: 'An ornate golden and emerald green box containing premium ayurvedic skincare. Packed with luxurious bottles of our finest scrubs, toners, and rare elixirs.',
        price: 24000,
        category: 'Gifts',
        image: '/images/gift_2.png',
        stock: 10,
        isFeatured: true
    },
    {
        name: 'Ocean Breeze Elegance Box',
        description: 'Sophisticated navy blue and silver packaging holds crystal clear serum bottles and luxury rejuvenating creams. Perfect for soothing and hydrating the skin.',
        price: 16500,
        category: 'Gifts',
        image: '/images/gift_3.png',
        stock: 25,
        isFeatured: false
    },
    {
        name: 'Flora & Blossom Magic Set',
        description: 'Exquisite pastel pink and rose gold ornate box filled with our best-selling floral skincare. Features botanical cleansing balms, toners, and facial oils.',
        price: 21000,
        category: 'Gifts',
        image: '/images/gift_4.png',
        stock: 8,
        isFeatured: true
    },
    {
        name: 'The Ultimate Spa Trunk',
        description: 'The pinnacle of luxury skincare gifting. A magnificent dark wood and gold trunk revealing dozens of high-end skincare bottles, glowing serums, and rich creams.',
        price: 45000,
        category: 'Gifts',
        image: '/images/gift_5.png',
        stock: 3,
        isFeatured: true
    }
];

mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('✅ MongoDB Connected');
        await Product.insertMany(giftProducts);
        console.log('✅ Gift Products successfully seeded!');
        mongoose.connection.close();
    })
    .catch((err) => {
        console.error('❌ Error seeding products:', err);
        mongoose.connection.close();
    });
