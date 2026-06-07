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
    {
        name: 'Saffron Radiance Night Restore',
        description: 'Deep repair night cream enriched with pure Kashmiri saffron threads. Restores natural skin texture, reduces hyperpigmentation, and promotes active youth cellular renewal.',
        price: 3400,
        image: '/images/mockup_royal.png',
        category: 'Night Cream',
        isFeatured: true,
        stock: 30,
    },
    {
        name: 'Vitamin C 20% Brightening Booster',
        description: 'Ultra-concentrated Vitamin C serum with Kakadu Plum extracts. Fades acne scars, brightens uneven skin tone, and offers powerful daytime defense against environmental damage.',
        price: 2950,
        image: '/images/mockup_serum_vitc.png',
        category: 'Serum',
        isFeatured: true,
        stock: 45,
    },
    {
        name: 'Retinol Advanced Renewing Elixir',
        description: '0.5% Pure Retinol combined with soothing Centella Asiatica. Targets fine lines, skin wrinkles, and bumpy texture while you sleep, ensuring minimal irritation.',
        price: 3800,
        image: '/images/mockup_night_organic.png',
        category: 'Serum',
        isFeatured: false,
        stock: 25,
    },
    {
        name: 'Sandalwood & Golden Honey Soap',
        description: 'Handcrafted luxury bathing bar. Rich sandalwood oil soothes inflammation while organic golden honey draws moisture into the skin, leaving it incredibly soft and fragrant.',
        price: 650,
        image: '/images/mockup_soap_honey.png',
        category: 'Soap',
        isFeatured: true,
        stock: 120,
    },
    {
        name: 'Activated Charcoal Detox Cleansing Bar',
        description: 'Deeply purifying body and face soap bar. Bamboo activated charcoal absorbs excess oil and impurities from deep inside pores, making it ideal for acne-prone skin.',
        price: 580,
        image: '/images/mockup_soap_charcoal.png',
        category: 'Soap',
        isFeatured: false,
        stock: 150,
    },
    {
        name: 'Creamy Oatmeal & Shea Butter Exfoliating Soap',
        description: 'Gentle exfoliating bar containing finely ground organic oats. Gently buffs away dead skin cells while raw shea butter replenishes vital lipids and skin moisture.',
        price: 620,
        image: '/images/mockup_soap_oatmeal.png',
        category: 'Soap',
        isFeatured: false,
        stock: 110,
    },
    {
        name: 'Wild Turmeric & Neem Healing Soap',
        description: 'Traditional Ayurvedic bar with fresh neem extract and wild turmeric. Acts as a natural antibacterial shield to heal rashes, blemishes, and protect skin health.',
        price: 590,
        image: '/images/mockup_royal.png',
        category: 'Soap',
        isFeatured: true,
        stock: 130,
    },
    {
        name: 'Luminous Pearl Sleeping Mask',
        description: 'A luxurious leave-on sleeping mask infused with crushed pearl powder and marine collagen. Brightens skin complexion and boosts skin elasticity overnight.',
        price: 3100,
        image: '/images/mockup_ethereal.png',
        category: 'Night Cream',
        isFeatured: false,
        stock: 35,
    },
    {
        name: 'Aloe Soothing Hydro Gel',
        description: 'Oil-free gel moisturizer containing 98% organic aloe vera extract. Instantly cools sun-damaged skin, calms redness, and provides lightweight weightless hydration.',
        price: 1400,
        image: '/images/mockup_minimalist.png',
        category: 'Moisturizer',
        isFeatured: false,
        stock: 90,
    },
    {
        name: 'Ultra Hydrating Coconut Water Cream',
        description: 'Whipped cloud cream packed with fresh coconut water and squalane. Restores the skin barrier and locks in deep, long-lasting moisture for up to 72 hours.',
        price: 2600,
        image: '/images/mockup_organic.png',
        category: 'Moisturizer',
        isFeatured: true,
        stock: 40,
    },
    {
        name: 'Daily UV Shield SPF 50 Day Cream',
        description: 'Broad-spectrum physical sunscreen cream. Lightweight, non-greasy formula that leaves zero white cast and protects skin against harmful UVA and UVB rays.',
        price: 1950,
        image: '/images/mockup_royal.png',
        category: 'Moisturizer',
        isFeatured: false,
        stock: 75,
    },
    {
        name: 'Rose Water Hydrating Mist Toner',
        description: '100% Pure steam-distilled Damask rose water. Instantly refreshes tired skin, balances natural pH levels, and tightens pores. Perfect as a mid-day mist.',
        price: 1200,
        image: '/images/mockup_toner_rose.png',
        category: 'Toner',
        isFeatured: false,
        stock: 80,
    },
    {
        name: 'Tea Tree Acne Clarifying Toner',
        description: 'Gentle exfoliating toner with tea tree oil and 2% Salicylic Acid (BHA). Unclogs pores, reduces blackheads, and regulates sebum production.',
        price: 1650,
        image: '/images/mockup_night_organic.png',
        category: 'Toner',
        isFeatured: false,
        stock: 65,
    },
    {
        name: 'Saffron & Gold Illuminating Face Wash',
        description: 'Luxurious gel cleanser that gently removes makeup, dirt, and excess oil. Promotes a glowing, luminous look with real saffron threads.',
        price: 1450,
        image: '/images/mockup_royal.png',
        category: 'Cleanser',
        isFeatured: true,
        stock: 70,
    },
    {
        name: 'Gentle Lavender Foaming Cleanser',
        description: 'Sulfate-free soothing cleanser that transforms into a rich, creamy foam. Calms the senses with lavender oil while keeping skin clean and hydrated.',
        price: 1300,
        image: '/images/mockup_cleanser_lavender.png',
        category: 'Cleanser',
        isFeatured: false,
        stock: 85,
    },
    {
        name: 'Youth Renewal Bakuchiol Serum',
        description: 'Plant-based retinol alternative Bakuchiol combined with Rosehip Oil. Targets premature aging signs, stimulates collagen, and is safe for sensitive daytime use.',
        price: 3600,
        image: '/images/mockup_ethereal.png',
        category: 'Serum',
        isFeatured: true,
        stock: 30,
    },
    {
        name: 'Cocoa Butter Intensive Body Lotion',
        description: 'Deeply moisturizing body cream infused with raw cocoa butter and vitamin E. Heals extremely dry, flaky skin and leaves a sweet chocolate aroma.',
        price: 1850,
        image: '/images/mockup_organic.png',
        category: 'Moisturizer',
        isFeatured: false,
        stock: 55,
    }
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
