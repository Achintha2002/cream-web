import { Link } from 'react-router-dom';
import imgMockupOrganic from '../assets/images/mockup_organic.png';
import imgIngredients from '../assets/images/ingredients.png';
import imgUiNature from '../assets/images/ui_nature.png';

const Home = () => {
    return (
        <>
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-24 bg-green-50 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 right-0 w-2/3 h-full bg-green-100/40 rounded-l-[200px] hidden lg:block"></div>
                <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-green-200/30 rounded-full blur-3xl"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    <div className="space-y-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <span className="inline-block px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-bold tracking-wide uppercase mb-2 border border-green-200">100% Organic & Pure</span>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight text-green-900">
                            Nature's Best Secret <br />
                            <span className="text-green-600">For Your Skin</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                            Embrace the healing power of Aloe Vera and pure botanicals. Raani Cream brings you "supiri" natural radiance, free from harsh chemicals.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link to="/products" className="px-8 py-4 bg-green-700 text-white text-lg rounded-full hover:bg-green-800 transition shadow-xl hover:shadow-green-200 transform hover:-translate-y-1 text-center">Shop Naturally</Link>
                            <Link to="/about" className="px-8 py-4 border-2 border-green-700 text-green-700 text-lg rounded-full hover:bg-green-50 transition text-center font-medium">Our Ingredients</Link>
                        </div>
                    </div>

                    <div className="relative opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <div className="relative z-10 animate-float">
                            {/* Showing the Organic Mockup as Hero */}
                            <img src={imgMockupOrganic} alt="Raani Organic Cream in Nature" className="w-full max-w-lg mx-auto drop-shadow-2xl rounded-tr-[80px] rounded-bl-[80px] rounded-tl-3xl rounded-br-3xl border-4 border-white" />
                        </div>
                        {/* Leaf decorations */}
                        <div className="absolute -top-10 right-10 text-6xl animate-leaf-sway" style={{ animationDelay: '1s' }}>🌿</div>
                        <div className="absolute bottom-10 -left-5 text-5xl animate-leaf-sway" style={{ animationDelay: '2s' }}>🌱</div>
                    </div>

                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif font-bold text-green-900 mb-4">Pure. Potent. Plant-Based.</h2>
                        <div className="w-20 h-1.5 bg-green-500 mx-auto rounded-full"></div>
                        <p className="mt-4 text-gray-600">The organic choice for glowing skin.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Feature 1 */}
                        <div className="text-center group p-8 rounded-2xl bg-earth-50 hover:bg-green-50 transition duration-300 border border-transparent hover:border-green-100">
                            <div className="w-20 h-20 mx-auto bg-white shadow-md rounded-full flex items-center justify-center mb-6 text-4xl">
                                🍃
                            </div>
                            <h3 className="text-2xl font-serif font-bold mb-3 text-green-800">Fresh Aloe Vera</h3>
                            <p className="text-gray-600">Harvested fresh to soothe and hydrate your skin deeply.</p>
                        </div>
                        {/* Feature 2 */}
                        <div className="text-center group p-8 rounded-2xl bg-earth-50 hover:bg-green-50 transition duration-300 border border-transparent hover:border-green-100">
                            <div className="w-20 h-20 mx-auto bg-white shadow-md rounded-full flex items-center justify-center mb-6 text-4xl">
                                🐰
                            </div>
                            <h3 className="text-2xl font-serif font-bold mb-3 text-green-800">Cruelty Free</h3>
                            <p className="text-gray-600">Tested on queens, never on animals. 100% ethical.</p>
                        </div>
                        {/* Feature 3 */}
                        <div className="text-center group p-8 rounded-2xl bg-earth-50 hover:bg-green-50 transition duration-300 border border-transparent hover:border-green-100">
                            <div className="w-20 h-20 mx-auto bg-white shadow-md rounded-full flex items-center justify-center mb-6 text-4xl">
                                ✨
                            </div>
                            <h3 className="text-2xl font-serif font-bold mb-3 text-green-800">Natural Glow</h3>
                            <p className="text-gray-600">Unlock that "supiri" radiance with pure saffron extracts.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Showcase Section (Green Theme) */}
            <section className="relative py-24 bg-green-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    {/* Using ingredients image as background texture */}
                    <img src={imgIngredients} alt="Ingredients" className="w-full h-full object-cover" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">Hydration That Feels Like Rain</h2>
                        <p className="text-green-100 text-lg mb-8 max-w-md leading-relaxed">
                            Our formula mimics nature's moisture. Light, refreshing, and deeply nourishing. Experience the purity of Raani Organic.
                        </p>
                        <Link to="/products" className="inline-block px-8 py-3 bg-white text-green-900 rounded-full hover:bg-green-50 transition font-bold shadow-lg">Experience Freshness</Link>
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <img src={imgUiNature} alt="Raani Nature UI" className="relative rounded-lg border-4 border-white/20 w-full max-w-md shadow-2xl transform rotate-2 hover:rotate-0 transition duration-500" />
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif font-bold text-green-900">Loved by Nature Lovers</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Review 1 */}
                        <div className="bg-green-50 p-8 rounded-tr-3xl rounded-bl-3xl shadow-sm border border-green-100">
                            <div className="flex text-green-500 mb-4">★★★★★</div>
                            <p className="text-gray-700 italic mb-6">"Finally an organic cream that works! My skin feels so fresh and the aloe scent is amazing. Supiri stuff!"</p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center text-green-700 font-bold mr-3">S</div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Shenali P.</h4>
                                </div>
                            </div>
                        </div>
                        {/* Review 2 */}
                        <div className="bg-green-50 p-8 rounded-tr-3xl rounded-bl-3xl shadow-sm border border-green-100">
                            <div className="flex text-green-500 mb-4">★★★★★</div>
                            <p className="text-gray-700 italic mb-6">"I switched to Raani because it's natural. Best decision ever. No more chemicals, just pure glow."</p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center text-green-700 font-bold mr-3">D</div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Dilhani K.</h4>
                                </div>
                            </div>
                        </div>
                        {/* Review 3 */}
                        <div className="bg-green-50 p-8 rounded-tr-3xl rounded-bl-3xl shadow-sm border border-green-100">
                            <div className="flex text-green-500 mb-4">★★★★★</div>
                            <p className="text-gray-700 italic mb-6">"Nature in a jar. Seriously, the texture is so light. Loves it!"</p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center text-green-700 font-bold mr-3">A</div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Amasha S.</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
