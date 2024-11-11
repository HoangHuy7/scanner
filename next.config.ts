import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true, // Kích hoạt chế độ Strict Mode trong React
    swcMinify: true,       // Tăng hiệu suất bằng trình minify của SWC
    output: "standalone",  // Hữu ích khi deploy trên Render
};

export default nextConfig;
