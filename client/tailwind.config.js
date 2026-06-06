/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                green: {
                    50: '#F2FDF5',   // Very light green background
                    100: '#DCFCE7',  // Soft green
                    500: '#22C55E',  // Vibrant green
                    600: '#16A34A',  // Primary Green
                    800: '#166534',  // Deep Green text
                    900: '#14532D',  // Darkest Green
                },
                earth: {
                    50: '#FAFAF9',   // Stone white
                    100: '#F5F5F4',  // Warm grey
                    200: '#E7E5E4',  // Stone
                },
                gold: {
                    500: '#D4AF37', // Keeping subtle gold accents
                }
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['Inter', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'fade-in-up': 'fadeInUp 1s ease-out forwards',
                'leaf-sway': 'sway 4s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                sway: {
                    '0%, 100%': { transform: 'rotate(-5deg)' },
                    '50%': { transform: 'rotate(5deg)' },
                }
            }
        },
    },
    plugins: [],
}
