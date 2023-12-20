import type {Config} from 'tailwindcss'

const config: Config = {
    content: [
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {},
    plugins: [
        require('tailwind-scrollbar')({nocompatible: true})
    ],
}
export default config
