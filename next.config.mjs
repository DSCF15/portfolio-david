/** @type {import('next').NextConfig} */
const nextConfig = {
  // Gera um site estático em /out — funciona na Vercel, Netlify,
  // Cloudflare Pages ou GitHub Pages sem servidor.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
