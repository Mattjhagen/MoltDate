/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'molt-dark': '#0f172a',
                'molt-accent': '#10b981',
                'molt-card': '#1e293b',
            },
        },
    },
    plugins: [],
}
