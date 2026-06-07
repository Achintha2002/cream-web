import { useState, useEffect } from 'react';
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
};

const getImage = (imgPath) => imageMap[imgPath] || imgPath;

const ProductCard = ({ product, onAddToCart }) => (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg border border-green-50 hover:border-green-200 hover:shadow-2xl transition duration-500 transform hover:-translate-y-2">
        <div className="h-80 overflow-hidden bg-green-50 relative flex items-center justify-center p-8">
            <img
                src={getImage(product.image)}
                alt={product.name}
                className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition duration-500 shadow-md"
            />
            {product.isFeatured && (
                <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    ⭐ FEATURED
                </div>
            )}
            {product.stock === 0 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-2xl">
                    <span className="text-white font-bold text-lg">Out of Stock</span>
                </div>
            )}
        </div>
        <div className="p-8">
            <div className="text-green-600 text-sm font-bold mb-2 uppercase tracking-wide">{product.category}</div>
            <h3 className="text-2xl font-serif font-bold mb-2 text-green-900">{product.name}</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed line-clamp-2">{product.description}</p>
            <div className="flex justify-between items-center border-t border-green-50 pt-6">
                <span className="text-2xl font-bold text-green-800">LKR {product.price.toLocaleString()}</span>
                <button
                    disabled={product.stock === 0}
                    onClick={() => onAddToCart(product)}
                    className="bg-green-800 text-white px-6 py-2 rounded-full hover:bg-green-700 transition shadow-lg hover:shadow-green-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
                </button>
            </div>
        </div>
    </div>
);

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState(['All']);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All');
    const { addToCart } = useCart();

    // Fetch categories dynamically on mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await productsAPI.getAll();
                if (res.success && res.data) {
                    const uniqueCategories = ['All', ...new Set(res.data.map(p => p.category))];
                    setCategories(uniqueCategories);
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
                const params = activeCategory !== 'All' ? { category: activeCategory } : {};
                const data = await productsAPI.getAll(params);
                setProducts(data.data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [activeCategory]);

    return (
        <div className="pt-24">
            {/* Header */}
            <header className="py-20 bg-green-50 text-center relative">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="w-96 h-96 bg-green-200 rounded-full blur-3xl absolute -top-20 -left-20 opacity-30"></div>
                    <div className="w-96 h-96 bg-yellow-100 rounded-full blur-3xl absolute bottom-0 right-0 opacity-30"></div>
                </div>
                <h1 className="text-5xl font-serif font-bold text-green-900 mb-4 relative z-10">The Organic Collection</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto relative z-10">Safe, clean, and effective skincare straight from nature.</p>
            </header>

            {/* Category Filter */}
            <section className="py-8 bg-white border-b border-green-50">
                <div className="max-w-7xl mx-auto px-4 flex gap-3 flex-wrap justify-center">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full font-medium transition ${
                                activeCategory === cat
                                    ? 'bg-green-800 text-white shadow-lg'
                                    : 'bg-green-50 text-green-800 hover:bg-green-100'
                            }`}
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
                    <button className="bg-white text-green-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-green-50 transition shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                        Get the Green Kit - LKR 6,500
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Products;
