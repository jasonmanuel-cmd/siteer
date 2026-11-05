import { fileURLToPath } from "node:url";

const nextConfig = {
  outputFileTracingRoot: fileURLToPath(new URL(".", import.meta.url)),
  images: {
    domains: [],
  },
};

export default nextConfig;
