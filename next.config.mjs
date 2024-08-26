/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        API_URL: process.env.NEXT_PUBLIC_API_URL,
        WEBSOCKET_URL: process.env.NEXT_PUBLIC_WEBSOCKET_URL,
    },
};

export default nextConfig;
