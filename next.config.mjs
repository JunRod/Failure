/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/a/ACg8ocJ_1Ir4KaL5pTmiVrPYw_xZgNWP1nkD_MqH7Refjydd0vY=s96-c',
            },
        ],
    },
}
export default nextConfig