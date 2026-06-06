import imgModel from '../assets/images/model.png';
import imgIngredients from '../assets/images/ingredients.png';

const About = () => {
    return (
        <div className="pt-24">
            {/* Header */}
            <header className="py-20 bg-green-50 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-green-200 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-yellow-100 rounded-full blur-3xl opacity-50"></div>

                <h1 className="text-5xl font-serif font-bold text-green-900 mb-6 relative z-10">Rooted in Nature</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto relative z-10">From the lush gardens to your skincare ritual.</p>
            </header>

            {/* Story Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-green-100 rounded-tr-[100px] rounded-bl-[50px] transform rotate-3 z-0"></div>
                        <img src={imgModel} alt="Natural Beauty" className="relative z-10 rounded-tr-[100px] rounded-bl-[50px] shadow-xl object-cover h-[500px] w-full border-4 border-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-serif font-bold mb-6 text-green-800">A Green Revolution</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Raani Organic began with a simple belief: nature provides everything we need. We replaced harsh synthetics with fresh Aloe Vera, wild turmeric, and organic saffron.
                        </p>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Every jar is a testament to the purity of our island's soil. No fillers, just pure botanical power designed to bring out your natural, healthy glow. It's truly "Supiri" – superior in every way.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">🌱</div>
                            <span className="text-green-800 font-bold">100% Plant Based</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ingredients Parallax */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif font-bold text-green-900 mb-4">Mother Earth's Recipe</h2>
                        <p className="text-gray-500">Simple ingredients. Powerful results.</p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-12 bg-earth-50 rounded-3xl p-8 md:p-12 shadow-sm">
                        <div className="w-full md:w-1/2">
                            <img src={imgIngredients} alt="Fresh Ingredients" className="w-full rounded-2xl shadow-lg transform hover:scale-[1.02] transition duration-500 border-4 border-white" />
                        </div>
                        <div className="w-full md:w-1/2 space-y-10">
                            <div className="flex items-start group">
                                <div className="bg-green-100 p-4 rounded-full mr-6 text-green-600 text-2xl group-hover:bg-green-600 group-hover:text-white transition duration-300">
                                    🌿</div>
                                <div>
                                    <h3 className="font-bold text-xl mb-2 text-green-900">Organic Aloe Vera</h3>
                                    <p className="text-gray-600">The heart of our formula. Deeply hydrates and calms inflammation instantly.</p>
                                </div>
                            </div>
                            <div className="flex items-start group">
                                <div className="bg-orange-100 p-4 rounded-full mr-6 text-orange-600 text-2xl group-hover:bg-orange-500 group-hover:text-white transition duration-300">
                                    🌸</div>
                                <div>
                                    <h3 className="font-bold text-xl mb-2 text-green-900">Wild Saffron</h3>
                                    <p className="text-gray-600">Hand-picked strands that naturally brighten and even out skin tone.</p>
                                </div>
                            </div>
                            <div className="flex items-start group">
                                <div className="bg-yellow-100 p-4 rounded-full mr-6 text-yellow-600 text-2xl group-hover:bg-yellow-500 group-hover:text-white transition duration-300">
                                    🥥</div>
                                <div>
                                    <h3 className="font-bold text-xl mb-2 text-green-900">Virgin Coconut Oil</h3>
                                    <p className="text-gray-600">Locks in moisture and provides a protective barrier against pollution.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
