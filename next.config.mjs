
const nextConfig = {
  async redirects() {
    return [{ source: "/scan", destination: "/get-quote?plan=free", permanent: false }];
  },
  images: {
    domains: [],
  },
};

export default nextConfig;
