import { Link } from 'react-router-dom';
import imgMockupOrganic from '../assets/images/mockup_organic.png';
import imgIngredients from '../assets/images/ingredients.png';
import imgMockupRoyal from '../assets/images/mockup_royal.png';

import iconPlantBased from '../assets/images/icons/icon_plant_based_1781082889362.png';
import iconCrueltyFree from '../assets/images/icons/icon_cruelty_free_1781082902686.png';
import iconSriLanka from '../assets/images/icons/icon_sri_lanka_1781082920997.png';
import iconClean from '../assets/images/icons/icon_clean_1781082934772.png';
import featureAloe from '../assets/images/icons/feature_aloe_1781082954006.png';
import featureGlow from '../assets/images/icons/feature_glow_1781082970941.png';

/* ── Reusable badge component matching reference style ── */
const TrustBadge = ({ icon, label }) => (
    <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3 shadow-sm border border-stone-100">
        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 overflow-hidden mix-blend-multiply">
            <img src={icon} alt={label} className="w-[120%] h-[120%] object-cover" />
        </div>
        <span className="text-sm font-semibold text-green-900 whitespace-nowrap">{label}</span>
    </div>
);

/* ── Feature card ── */
const FeatureCard = ({ icon, title, desc }) => (
    <div className="group flex flex-col items-center text-center p-10 rounded-3xl border border-stone-100 bg-white hover:border-green-200 hover:shadow-xl transition-all duration-300">
        <div className="w-24 h-24 rounded-full bg-green-50/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 overflow-hidden mix-blend-multiply">
            <img src={icon} alt={title} className="w-[120%] h-[120%] object-cover" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-green-900 mb-3">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
);

/* ── Testimonial card ── */
const TestimonialCard = ({ quote, name, initial }) => (
    <div className="bg-[#F7F5F2] rounded-3xl p-8 border border-stone-200 flex flex-col gap-4">
        <div className="flex gap-1 text-amber-400 text-lg">★★★★★</div>
        <p className="text-gray-600 text-sm leading-relaxed italic flex-1">"{quote}"</p>
        <div className="flex items-center gap-3 pt-2 border-t border-stone-200">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-bold text-sm">
                {initial}
            </div>
            <span className="text-sm font-semibold text-gray-800">{name}</span>
        </div>
    </div>
);

const Home = () => {
    return (
        <>
            {/* ── Hero Section ── */}
            <section className="relative min-h-screen flex items-center pt-28 bg-[#F7F5F2] overflow-hidden">
                {/* Soft BG blobs */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-green-50/60 rounded-l-[120px] hidden lg:block pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-green-100/40 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-20">

                    {/* Left: Text */}
                    <div className="space-y-8">
                        <span className="section-label">Sri Lanka's Finest Organic Beauty</span>
                        <h1 className="text-5xl md:text-6xl xl:text-7xl font-serif font-bold leading-[1.1] text-[#1a2e1a]">
                            Nature's Best<br />
                            <span className="text-gradient">Secret For</span><br />
                            Your Skin
                        </h1>
                        <p className="text-gray-500 text-lg leading-relaxed max-w-md">
                            Embrace the healing power of Aloe Vera and pure botanicals. Raani Cream brings you natural radiance, free from harsh chemicals.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <Link to="/products" className="btn-primary text-sm">
                                Shop The Collection
                            </Link>
                            <Link to="/about" className="btn-outline text-sm">
                                Our Story
                            </Link>
                        </div>

                        {/* Trust Badges — reference style */}
                        <div className="flex flex-wrap gap-3 pt-4">
                            <TrustBadge icon={iconPlantBased} label="100% Plant Based" />
                            <TrustBadge icon={iconCrueltyFree} label="Cruelty Free" />
                            <TrustBadge icon={iconSriLanka} label="Made in Sri Lanka" />
                            <TrustBadge icon={iconClean} label="No Harsh Chemicals" />
                        </div>
                    </div>

                    {/* Right: Product Image */}
                    <div className="relative flex items-center justify-center">
                        {/* Glowing ring behind image */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-green-100/60 blur-3xl animate-pulse" />
                        </div>

                        <div className="relative z-10 animate-float animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <img
                                src={imgMockupOrganic}
                                alt="Raani Organic Cream"
                                className="w-full max-w-sm md:max-w-md mx-auto drop-shadow-2xl rounded-[3rem] border-4 border-white/80 hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Floating accent circles */}
                        <div className="absolute top-6 right-6 w-28 h-28 bg-green-100 rounded-full opacity-60 blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
                        <div className="absolute bottom-10 left-4 w-20 h-20 bg-amber-100 rounded-full opacity-50 blur-md animate-pulse" style={{ animationDelay: '2s' }} />
                    </div>
                </div>
            </section>

            {/* ── Brand Bar ── */}
            <section className="bg-white border-y border-stone-100 py-6">
                <div className="max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-center gap-8 text-stone-400 text-xs font-medium tracking-[0.18em] uppercase">
                    {['100% Organic', 'Dermatologist Tested', 'Paraben Free', 'Vegan Formula', 'Eco Packaging'].map(t => (
                        <span key={t} className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-green-400 inline-block" />
                            {t}
                        </span>
                    ))}
                </div>
            </section>

            {/* ── Feature Section ── */}
            <section className="py-28 bg-[#F7F5F2]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="section-label">Why Raani</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a2e1a] mt-2">Pure. Potent. Plant-Based.</h2>
                        <div className="divider-gold mt-5" />
                        <p className="text-gray-500 mt-4 max-w-xl mx-auto">The organic choice for glowing skin — crafted with love and the finest Sri Lankan ingredients.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FeatureCard icon={featureAloe} title="Fresh Aloe Vera" desc="Harvested fresh to soothe and hydrate your skin deeply, leaving it soft and radiant." />
                        <FeatureCard icon={iconCrueltyFree} title="Cruelty Free" desc="Tested on queens, never on animals. We are 100% ethical and certified cruelty-free." />
                        <FeatureCard icon={featureGlow} title="Natural Glow" desc="Unlock that supiri radiance with pure saffron extracts and time-honoured botanical blends." />
                    </div>
                </div>
            </section>

            {/* ── Showcase / Mid CTA ── */}
            <section className="relative py-28 bg-[#1b4332] text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <img src={imgIngredients} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="section-label text-green-300">Our Signature Formula</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mt-3 mb-6 leading-tight">
                            Hydration That<br />Feels Like Rain
                        </h2>
                        <p className="text-green-200 text-lg mb-8 max-w-md leading-relaxed">
                            Our formula mimics nature's moisture. Light, refreshing, and deeply nourishing — experience the purity of Raani Organic.
                        </p>
                        {/* Inline badges */}
                        <div className="flex flex-wrap gap-3 mb-8">
                            {['Aloe Vera', 'Rose Water', 'Saffron Extract', 'Coconut Oil'].map(b => (
                                <span key={b} className="flex items-center gap-1.5 bg-white/10 border border-white/20 text-green-100 text-xs font-medium px-4 py-2 rounded-full">
                                    {b}
                                </span>
                            ))}
                        </div>
                        <Link to="/products" className="inline-flex items-center gap-2 bg-white text-green-900 font-bold text-sm tracking-widest uppercase px-8 py-3.5 rounded-full hover:bg-green-50 transition shadow-xl">
                            Experience Freshness →
                        </Link>
                    </div>
                    <div className="flex justify-center">
                        <img
                            src={imgMockupRoyal}
                            alt="Raani Royal Cream"
                            className="w-full max-w-sm rounded-[3rem] shadow-2xl border-4 border-white/10 transform -rotate-2 hover:rotate-0 transition duration-500"
                        />
                    </div>
                </div>
            </section>

            {/* ── Testimonials ── */}
            <section className="py-28 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="section-label">Happy Customers</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a2e1a] mt-2">Loved by Nature Lovers</h2>
                        <div className="divider-gold mt-5" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <TestimonialCard
                            quote="Finally an organic cream that works! My skin feels so fresh and the aloe scent is amazing. Supiri stuff!"
                            name="Shenali P."
                            initial="S"
                        />
                        <TestimonialCard
                            quote="I switched to Raani because it's natural. Best decision ever. No more chemicals, just pure glow."
                            name="Dilhani K."
                            initial="D"
                        />
                        <TestimonialCard
                            quote="Nature in a jar. Seriously, the texture is so light. Absolutely loves it — skin has never felt better!"
                            name="Lihini J."
                            initial="L"
                        />
                    </div>
                </div>
            </section>

            {/* ── Bottom CTA Banner ── */}
            <section className="bg-[#F7F5F2] py-20 border-t border-stone-200">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <span className="section-label">Start Your Journey</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a2e1a] mt-3 mb-5">
                        Go Green. Glow Clean.
                    </h2>
                    <p className="text-gray-500 mb-8 max-w-lg mx-auto">
                        Discover our full organic collection — from serums to creams, every product crafted to reveal your natural radiance.
                    </p>
                    <Link to="/products" className="btn-primary text-sm inline-flex">
                        Shop All Products →
                    </Link>
                </div>
            </section>
        </>
    );
};

export default Home;
