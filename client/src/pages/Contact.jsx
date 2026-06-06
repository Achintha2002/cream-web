const Contact = () => {
    return (
        <div className="pt-24">
            {/* Header */}
            <header className="py-20 bg-green-50 text-center">
                <h1 className="text-5xl font-serif font-bold text-green-900 mb-4">Connect with Nature</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">Have questions? We are here to help you glow.</p>
            </header>

            <section className="py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16">

                    {/* Contact Form */}
                    <div className="bg-white p-10 rounded-3xl shadow-xl border border-green-100">
                        <h3 className="text-2xl font-serif font-bold mb-8 text-green-800 flex items-center gap-2">
                            <span>📩</span> Send us a Note
                        </h3>
                        <form className="space-y-6">
                            <div>
                                <label className="block text-gray-600 font-medium mb-2 text-sm uppercase tracking-wide">Name</label>
                                <input type="text" className="w-full bg-earth-50 border border-gray-200 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition" placeholder="Your name" />
                            </div>
                            <div>
                                <label className="block text-gray-600 font-medium mb-2 text-sm uppercase tracking-wide">Email</label>
                                <input type="email" className="w-full bg-earth-50 border border-gray-200 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition" placeholder="hello@example.com" />
                            </div>
                            <div>
                                <label className="block text-gray-600 font-medium mb-2 text-sm uppercase tracking-wide">Message</label>
                                <textarea className="w-full bg-earth-50 border border-gray-200 rounded-xl px-5 py-3 h-32 focus:outline-none focus:ring-2 focus:ring-green-500 transition" placeholder="How can we help?"></textarea>
                            </div>
                            <button type="button" className="w-full bg-green-700 text-white font-bold py-4 rounded-xl hover:bg-green-800 transition shadow-lg transform hover:-translate-y-1">Send Message</button>
                        </form>
                    </div>

                    {/* Info & Map */}
                    <div className="space-y-12">
                        <div>
                            <h3 className="text-2xl font-serif font-bold mb-8 text-green-800">Visit Our Green House</h3>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Step into our sanctuary in Colombo. Experience the textures, smells, and purity of our entire organic range.
                            </p>
                            <div className="space-y-6">
                                <div className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-green-50 hover:border-green-200 transition">
                                    <span className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-5 text-xl">📍</span>
                                    <span className="text-gray-700 font-medium">No. 12, Lotus Road, Colombo 03, Sri Lanka</span>
                                </div>
                                <div className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-green-50 hover:border-green-200 transition">
                                    <span className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-5 text-xl">📞</span>
                                    <span className="text-gray-700 font-medium">+94 77 123 4567</span>
                                </div>
                                <div className="flex items-center p-4 bg-white rounded-2xl shadow-sm border border-green-50 hover:border-green-200 transition">
                                    <span className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-5 text-xl">✉️</span>
                                    <span className="text-gray-700 font-medium">hello@raani.lk</span>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div>
                            <h4 className="text-lg font-serif font-semibold text-green-800 mb-5">Follow Us</h4>
                            <div className="flex items-center gap-4">

                                {/* Facebook */}
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Facebook"
                                    style={{ backgroundColor: '#1877F2' }}
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg transition-transform duration-200"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="26" height="26">
                                        <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988H7.898V12h2.54V9.797c0-2.506 1.493-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                    </svg>
                                </a>

                                {/* Instagram */}
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Instagram"
                                    style={{ background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg transition-transform duration-200"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="26" height="26">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 1.965 2.065.573 3.455.057 5.297-.028 7.152-.086 8.432-.1 8.841-.1 12c0 3.159.014 3.568.072 4.848.085 1.855.601 3.697 1.993 5.087 1.39 1.392 3.232 1.908 5.087 1.993 1.28.058 1.689.072 4.848.072 3.159 0 3.568-.014 4.848-.072 1.855-.085 3.697-.601 5.087-1.993 1.392-1.39 1.908-3.232 1.993-5.087.058-1.28.072-1.689.072-4.848 0-3.159-.014-3.568-.072-4.848-.085-1.855-.601-3.697-1.993-5.087C20.545.673 18.703.157 16.848.072 15.568.014 15.159 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
                                    </svg>
                                </a>

                                {/* WhatsApp */}
                                <a
                                    href="https://wa.me/94771234567"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="WhatsApp"
                                    style={{ backgroundColor: '#25D366' }}
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg transition-transform duration-200"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="26" height="26">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                </a>

                            </div>
                        </div>

                        {/* Mock Map */}
                        <div className="w-full h-80 bg-gray-200 rounded-3xl overflow-hidden relative shadow-lg border-4 border-white">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.5173950669!2d79.81362242137574!3d6.921922091925348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1707663363351!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale hover:grayscale-0 transition duration-1000"
                            ></iframe>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Contact;
