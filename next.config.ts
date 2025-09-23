import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // mantém o React em modo estrito
  eslint: {
    // Ignora erros de ESLint durante o build (ex: 'any', 'prefer-const')
    ignoreDuringBuilds: true,
  },
  // Aqui você pode adicionar outras configurações, como imagens externas, rewrites, etc.
};

export default nextConfig;
