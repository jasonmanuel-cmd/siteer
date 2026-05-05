/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Increase timeout for static page generation from default 60 seconds to 120 seconds
    staticPageGenerationTimeout: 120,
    // Experimental options for better build performance
    experimental: {
        isrMemoryCacheSize: 50 * 1024 * 1024, // 50MB ISR cache
    },
    images: {
        formats: ["image/avif", "image/webp"],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    compress: true,
    productionBrowserSourceMaps: false,
    swcMinify: true,
    async headers() {
        return [
            {
                // Security headers for all pages
                source: '/:path*',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'geolocation=(), microphone=(), camera=()',
                    },
                ],
            },
            {
                // Cache immutable static _next assets
                source: '/_next/static/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                // Cache public images for 30 days
                source: '/:all*\.(png|jpg|jpeg|svg|webp|avif)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=2592000, stale-while-revalidate=86400',
                    },
                ],
            },
            {
                // Cache HTML for 1 hour with revalidation
                source: '/:path*\.(html)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=3600, stale-while-revalidate=86400',
                    },
                ],
            },
        ];
    },
    async redirects() {
        return [
            // Catch any phantom routes and redirect to home
            // This prevents 404s from trying to generate non-existent pages
            {
                source: '/business-overview',
                destination: '/',
                permanent: false,
            },
        ];
    },
}

module.exports = nextConfig;
