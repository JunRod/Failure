/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {NEXT_PUBLIC_OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY}
}
export default nextConfig