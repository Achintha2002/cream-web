import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { productsAPI } from '../services/api';
import { useCart } from '../context/CartContext';

// Image map for local product images
const imageMap = {
    '/images/mockup_royal.png': new URL('../assets/images/mockup_royal.png', import.meta.url).href,
    '/images/mockup_ethereal.png': new URL('../assets/images/mockup_ethereal.png', import.meta.url).href,
    '/images/mockup_serum_ethereal.png': new URL('../assets/images/mockup_serum_ethereal.png', import.meta.url).href,
    '/images/mockup_cleanser_saffron.png': new URL('../assets/images/mockup_cleanser_saffron.png', import.meta.url).href,
    '/images/mockup_toner_teatree.png': new URL('../assets/images/mockup_toner_teatree.png', import.meta.url).href,
    '/images/mockup_night_organic.png': new URL('../assets/images/mockup_night_organic.png', import.meta.url).href,
    '/images/mockup_minimalist.png': new URL('../assets/images/mockup_minimalist.png', import.meta.url).href,
    '/images/mockup_organic.png': new URL('../assets/images/mockup_organic.png', import.meta.url).href,
    '/images/mockup_soap_honey.png': new URL('../assets/images/mockup_soap_honey.png', import.meta.url).href,
    '/images/mockup_soap_charcoal.png': new URL('../assets/images/mockup_soap_charcoal.png', import.meta.url).href,
    '/images/mockup_serum_vitc.png': new URL('../assets/images/mockup_serum_vitc.png', import.meta.url).href,
    '/images/mockup_toner_rose.png': new URL('../assets/images/mockup_toner_rose.png', import.meta.url).href,
    '/images/mockup_cleanser_lavender.png': new URL('../assets/images/mockup_cleanser_lavender.png', import.meta.url).href,
    '/images/mockup_soap_oatmeal.png': new URL('../assets/images/mockup_soap_oatmeal.png', import.meta.url).href,
    '/images/mockup_soap_turmeric.png': new URL('../assets/images/mockup_soap_turmeric.png', import.meta.url).href,
    '/images/mockup_moisturizer_aloe.png': new URL('../assets/images/mockup_moisturizer_aloe.png', import.meta.url).href,
    '/images/mockup_moisturizer_coconut.png': new URL('../assets/images/mockup_moisturizer_coconut.png', import.meta.url).href,
    '/images/mockup_moisturizer_spf.png': new URL('../assets/images/mockup_moisturizer_spf.png', import.meta.url).href,
    '/images/mockup_facecream_royal.png': new URL('../assets/images/mockup_facecream_royal.png', import.meta.url).href,
    '/images/mockup_facecream_organic.png': new URL('../assets/images/mockup_facecream_organic.png', import.meta.url).href,
    '/images/mockup_serum_retinol.png': new URL('../assets/images/mockup_serum_retinol.png', import.meta.url).href,
    '/images/mockup_serum_bakuchiol.png': new URL('../assets/images/mockup_serum_bakuchiol.png', import.meta.url).href,
    '/images/gift_1.png': new URL('../assets/images/gift_1.png', import.meta.url).href,
    '/images/gift_2.png': new URL('../assets/images/gift_2.png', import.meta.url).href,
    '/images/gift_3.png': new URL('../assets/images/gift_3.png', import.meta.url).href,
    '/images/gift_4.png': new URL('../assets/images/gift_4.png', import.meta.url).href,
    '/images/gift_5.png': new URL('../assets/images/gift_5.png', import.meta.url).href,
    '/images/promo_green_kit.png': new URL('../assets/images/promo_green_kit.png', import.meta.url).href,
};

const getImage = (imgPath) => imageMap[imgPath] || imgPath;

const ProductCard = ({ product, onAddToCart }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div 
            className="group relative bg-transparent rounded-3xl w-full h-[480px] perspective-1000"
            onMouseLeave={() => setIsFlipped(false)}
        >
            <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                
                {/* --- FRONT OF CARD --- */}
                <div 
                    className="absolute w-full h-full backface-hidden bg-white rounded-3xl overflow-hidden shadow-lg border border-green-50 hover:border-green-200 hover:shadow-2xl transition duration-500 flex flex-col cursor-pointer"
                    onClick={() => setIsFlipped(true)}
                >
                    <div className="h-60 overflow-hidden bg-green-50 relative flex items-center justify-center p-8">
                        <img
                            src={getImage(product.image)}
                            alt={product.name}
                            className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition duration-500 shadow-md"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition flex items-center justify-center pointer-events-none">
                            <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-green-800 text-xs font-bold px-4 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition duration-300 pointer-events-none">
                                Tap for Details ↺
                            </span>
                        </div>
                        {product.isFeatured && (
                            <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10 pointer-events-none">
                                ⭐ FEATURED
                            </div>
                        )}
                        {product.stock === 0 && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-2xl z-10 pointer-events-none">
                                <span className="text-white font-bold text-lg">Out of Stock</span>
                            </div>
                        )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between pointer-events-none">
                        <div>
                            <div className="text-green-600 text-sm font-bold mb-1 uppercase tracking-wide">{product.category}</div>
                            <h3 className="text-xl font-serif font-bold mb-2 text-green-900">{product.name}</h3>
                            <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-2">{product.description}</p>
                        </div>
                        <div className="flex justify-between items-center border-t border-green-50 pt-4 mt-auto">
                            <span className="text-xl font-bold text-green-800">LKR {product.price.toLocaleString()}</span>
                            <button
                                disabled={product.stock === 0}
                                onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                                className="bg-green-800 text-white px-5 py-2 text-sm rounded-full hover:bg-green-700 transition shadow-md hover:shadow-green-200 disabled:opacity-50 disabled:cursor-not-allowed pointer-events-auto"
                            >
                                {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- BACK OF CARD --- */}
                <div 
                    className="absolute w-full h-full backface-hidden bg-green-950 rounded-3xl overflow-hidden shadow-2xl border border-green-800 rotate-y-180 p-6 flex flex-col text-white cursor-pointer"
                    onClick={() => setIsFlipped(false)}
                >
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-serif font-bold text-green-50">{product.name}</h3>
                        <button 
                            onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition flex-shrink-0"
                        >
                            ✕
                        </button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pointer-events-auto cursor-default">
                        <h4 className="text-green-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                            <span className="w-4 h-[1px] bg-green-400"></span>
                            Full Description
                        </h4>
                        <p className="text-stone-300 text-sm leading-relaxed mb-6">{product.description}</p>
                        
                        <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-4">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-stone-400 text-xs uppercase tracking-wider">Availability</span>
                                <span className="text-white font-bold text-sm">{product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-stone-400 text-xs uppercase tracking-wider">Category</span>
                                <span className="text-white font-bold text-sm">{product.category}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/10 pointer-events-auto">
                        <button
                            disabled={product.stock === 0}
                            onClick={(e) => { e.stopPropagation(); onAddToCart(product); setIsFlipped(false); }}
                            className="w-full bg-white text-green-950 py-3 rounded-xl font-bold hover:bg-green-50 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                        >
                            {product.stock === 0 ? 'Sold Out' : `Add to Cart — LKR ${product.price.toLocaleString()}`}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

const Products = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState(['All']);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All');
    const { addToCart } = useCart();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    // Fetch categories dynamically on mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await productsAPI.getAll();
                if (res.success && res.data) {
                    const raw = [...new Set(res.data.map(p => p.category))];
                    // Custom order: Soap near top, Gifts at end
                    const priority = ['Soap'];
                    const end = ['Gifts'];
                    const middle = raw.filter(c => !priority.includes(c) && !end.includes(c));
                    const sorted = ['All', ...priority.filter(c => raw.includes(c)), ...middle, ...end.filter(c => raw.includes(c))];
                    setCategories(sorted);
                }
            } catch (err) {
                console.error('Failed to extract categories:', err);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const params = {};
                if (activeCategory !== 'All') params.category = activeCategory;
                if (searchQuery) params.search = searchQuery;

                const data = await productsAPI.getAll(params);
                setProducts(data.data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [activeCategory, searchQuery]);

    return (
        <div className="pt-28">
            {/* Header */}
            <header className="py-20 bg-green-50 text-center relative">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="w-96 h-96 bg-green-200 rounded-full blur-3xl absolute -top-20 -left-20 opacity-30"></div>
                    <div className="w-96 h-96 bg-yellow-100 rounded-full blur-3xl absolute bottom-0 right-0 opacity-30"></div>
                </div>
                <h1 className="text-5xl font-serif font-bold text-green-900 mb-4 relative z-10">
                    {searchQuery ? `Search: "${searchQuery}"` : 'The Organic Collection'}
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto relative z-10">
                    {searchQuery ? `${products.length} products found matching your search.` : 'Safe, clean, and effective skincare straight from nature.'}
                </p>
                {searchQuery && (
                    <button
                        onClick={() => setSearchParams({})}
                        className="mt-4 bg-green-800 text-white text-xs font-bold px-6 py-2 rounded-full hover:bg-green-700 transition relative z-20"
                    >
                        Clear Search
                    </button>
                )}
            </header>

            {/* Category Filter */}
            <section className="py-8 bg-white border-b border-stone-100">
                <div className="max-w-7xl mx-auto px-4 flex gap-2 flex-wrap justify-center">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <div className="w-12 h-12 border-4 border-green-200 border-t-green-700 rounded-full animate-spin"></div>
                            <p className="text-gray-500">Loading products...</p>
                        </div>
                    )}
                    {error && (
                        <div className="text-center py-20">
                            <p className="text-red-500 text-lg">❌ {error}</p>
                            <p className="text-gray-400 mt-2">Please make sure the backend server is running.</p>
                        </div>
                    )}
                    {!loading && !error && products.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">No products found.</p>
                        </div>
                    )}
                    {!loading && !error && products.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {products.map(product => (
                                <ProductCard key={product._id} product={product} onAddToCart={addToCart} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Promo Banner */}
            <section className="py-20 bg-green-800 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-700 rounded-full opacity-50 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10">
                    <h2 className="text-4xl font-serif font-bold mb-6">Go Green, Glow Clean</h2>
                    <p className="text-xl mb-10 max-w-2xl mx-auto text-green-100">Starter kit with all essentials for complete natural care.</p>
                    <button 
                        onClick={() => {
                            addToCart({
                                _id: 'promo-green-kit',
                                name: 'The Green Starter Kit',
                                price: 6500,
                                stock: 999,
                                image: '/images/promo_green_kit.png',
                                category: 'Bundles',
                                description: 'Starter kit with all essentials for complete natural care.'
                            });
                            navigate('/checkout');
                        }}
                        className="bg-white text-green-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-green-50 transition shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                    >
                        Get the Green Kit - LKR 6,500
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Products;
