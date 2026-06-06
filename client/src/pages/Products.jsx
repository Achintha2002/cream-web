import imgOrganic from '../assets/images/mockup_organic.png';
import imgNight from '../assets/images/mockup_night_organic.png';
import imgMinimalist from '../assets/images/mockup_minimalist.png';
import imgIngredients from '../assets/images/ingredients.png';

const Products = () => {
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

            {/* Products Grid */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

                        {/* Product 1 */}
                        <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg border border-green-50 hover:border-green-200 hover:shadow-2xl transition duration-500 transform hover:-translate-y-2">
                            <div className="h-80 overflow-hidden bg-green-50 relative flex items-center justify-center p-8">
                                <img src={imgOrganic} alt="Raani Aloe Vera Gel" className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition duration-500 shadow-md" />
                                <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">100% PURE</div>
                            </div>
                            <div className="p-8">
                                <div className="text-green-600 text-sm font-bold mb-2 uppercase tracking-wide">Daily Essential</div>
                                <h3 className="text-2xl font-serif font-bold mb-2 text-green-900">Raani Aloe Radiance</h3>
                                <p className="text-gray-500 text-sm mb-6 leading-relaxed">Pure aloe vera with saffron infusion for everyday hydration.</p>
                                <div className="flex justify-between items-center border-t border-green-50 pt-6">
                                    <span className="text-2xl font-bold text-green-800">LKR 2,500</span>
                                    <button className="bg-green-800 text-white px-6 py-2 rounded-full hover:bg-green-700 transition shadow-lg hover:shadow-green-200">Add to Cart</button>
                                </div>
                            </div>
                        </div>

                        {/* Product 2 */}
                        <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg border border-green-50 hover:border-green-200 hover:shadow-2xl transition duration-500 transform hover:-translate-y-2">
                            <div className="h-80 overflow-hidden bg-green-50 relative flex items-center justify-center p-8">
                                <img src={imgNight} alt="Raani Night Repair" className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition duration-500 shadow-md" />
                            </div>
                            <div className="p-8">
                                <div className="text-green-600 text-sm font-bold mb-2 uppercase tracking-wide">Intensive Care</div>
                                <h3 className="text-2xl font-serif font-bold mb-2 text-green-900">Raani Botanical Night</h3>
                                <p className="text-gray-500 text-sm mb-6 leading-relaxed">Deep nourishment with avocado and essential oils.</p>
                                <div className="flex justify-between items-center border-t border-green-50 pt-6">
                                    <span className="text-2xl font-bold text-green-800">LKR 3,200</span>
                                    <button className="bg-green-800 text-white px-6 py-2 rounded-full hover:bg-green-700 transition shadow-lg hover:shadow-green-200">Add to Cart</button>
                                </div>
                            </div>
                        </div>

                        {/* Product 3 */}
                        <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg border border-green-50 hover:border-green-200 hover:shadow-2xl transition duration-500 transform hover:-translate-y-2">
                            <div className="h-80 overflow-hidden bg-green-50 relative flex items-center justify-center p-8">
                                <img src={imgMinimalist} alt="Raani Gentle Cleanser" className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition duration-500 shadow-md" />
                            </div>
                            <div className="p-8">
                                <div className="text-green-600 text-sm font-bold mb-2 uppercase tracking-wide">Cleansing</div>
                                <h3 className="text-2xl font-serif font-bold mb-2 text-green-900">Raani Gentle Foam</h3>
                                <p className="text-gray-500 text-sm mb-6 leading-relaxed">Sulfate-free cleanser that purifies without drying.</p>
                                <div className="flex justify-between items-center border-t border-green-50 pt-6">
                                    <span className="text-2xl font-bold text-green-800">LKR 1,800</span>
                                    <button className="bg-green-800 text-white px-6 py-2 rounded-full hover:bg-green-700 transition shadow-lg hover:shadow-green-200">Add to Cart</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Promo Banner */}
            <section className="py-20 bg-green-800 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-700 rounded-full opacity-50 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10">
                    <h2 className="text-4xl font-serif font-bold mb-6">Go Green, Glow Clean</h2>
                    <p className="text-xl mb-10 max-w-2xl mx-auto text-green-100">Starter kit with all 3 essentials for complete natural care.</p>
                    <button className="bg-white text-green-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-green-50 transition shadow-xl hover:shadow-2xl transform hover:-translate-y-1">Get the Green Kit - LKR 6,500</button>
                </div>
            </section>
        </div>
    );
};

export default Products;
