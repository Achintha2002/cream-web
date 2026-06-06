import imgUiNature from '../assets/images/ui_nature.png';
import imgUiRoyal from '../assets/images/ui_royal.png';
import imgUiMinimalist from '../assets/images/ui_minimalist.png';
import imgUiTrendy from '../assets/images/ui_trendy.png';

const Gallery = () => {
    return (
        <div className="pt-24">
            {/* Header */}
            <header className="py-20 bg-green-50 text-center">
                <h1 className="text-4xl font-serif font-bold text-green-900 mb-4">Raani Through The Lens</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">Visualizing the organic purity in every drop.</p>
            </header>

            {/* Designs Grid */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-24">

                        {/* Use the Nature one first since it matches the theme */}
                        <div className="flex flex-col md:flex-row gap-12 items-center">
                            <div className="md:w-1/2">
                                <img src={imgUiNature} alt="Nature UI Design" className="w-full rounded-2xl shadow-2xl border-4 border-green-100 transform hover:scale-[1.02] transition duration-500" />
                            </div>
                            <div className="md:w-1/2">
                                <span className="text-green-600 font-bold tracking-wider uppercase text-sm mb-2 block">Current Theme</span>
                                <h2 className="text-4xl font-serif font-bold mb-6 text-green-900">Organic Harmony</h2>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    This is the live theme of the website. It celebrates the freshness of Aloe Vera and nature. Soft greens and earthy tones create a calming, eco-conscious vibe perfect for our organic mission.
                                </p>
                            </div>
                        </div>

                        {/* Concept 2: Royal */}
                        <div className="flex flex-col md:flex-row-reverse gap-12 items-center opacity-80 hover:opacity-100 transition duration-500">
                            <div className="md:w-1/2">
                                <img src={imgUiRoyal} alt="Royal UI Design" className="w-full rounded-2xl shadow-xl border-4 border-gray-100 filter grayscale hover:grayscale-0 transition duration-700" />
                            </div>
                            <div className="md:w-1/2">
                                <span className="text-gray-400 font-bold tracking-wider uppercase text-sm mb-2 block">Concept</span>
                                <h2 className="text-3xl font-serif font-bold mb-4 text-gray-800">The Royal Edition</h2>
                                <p className="text-gray-600 mb-4">A darker, more luxurious take. Uses deep purples and gold gradients for an exclusive night-time ritual feel.</p>
                            </div>
                        </div>

                        {/* Concept 3: Minimalist */}
                        <div className="flex flex-col md:flex-row gap-12 items-center opacity-80 hover:opacity-100 transition duration-500">
                            <div className="md:w-1/2">
                                <img src={imgUiMinimalist} alt="Minimalist UI Design" className="w-full rounded-2xl shadow-xl border-4 border-gray-100 filter grayscale hover:grayscale-0 transition duration-700" />
                            </div>
                            <div className="md:w-1/2">
                                <span className="text-gray-400 font-bold tracking-wider uppercase text-sm mb-2 block">Concept</span>
                                <h2 className="text-3xl font-serif font-bold mb-4 text-gray-800">Pure Minimalist</h2>
                                <p className="text-gray-600 mb-4">Focusing purely on clinical effectiveness. Ultra-clean white interface with generous whitespace.</p>
                            </div>
                        </div>

                        {/* Concept 4: Trendy */}
                        <div className="flex flex-col md:flex-row-reverse gap-12 items-center opacity-80 hover:opacity-100 transition duration-500">
                            <div className="md:w-1/2">
                                <img src={imgUiTrendy} alt="Trendy UI Design" className="w-full rounded-2xl shadow-xl border-4 border-gray-100 filter grayscale hover:grayscale-0 transition duration-700" />
                            </div>
                            <div className="md:w-1/2">
                                <span className="text-gray-400 font-bold tracking-wider uppercase text-sm mb-2 block">Concept</span>
                                <h2 className="text-3xl font-serif font-bold mb-4 text-gray-800">Rose Gold Glamour</h2>
                                <p className="text-gray-600 mb-4">A vibrant, high-fashion magazine aesthetic with rose gold accents and bold typography.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default Gallery;
