import "tailwindcss";

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'soft-bg': '#FDFBF7',
                'soft-surface': '#FFFFFF',
                'soft-text-primary': '#1C1917',
                'soft-text-secondary': '#57534E',
                'primary': '#D97706',
                'primary-hover': '#B45309',
                'success': '#10B981',
                'error': '#EF4444',
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            boxShadow: {
                'soft': '0 4px 20px -2px rgba(28, 25, 23, 0.05)',
                'soft-hover': '0 10px 25px -5px rgba(28, 25, 23, 0.1)',
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
                '3xl': '2rem',
            }
        },
    },
    plugins: [],
}
