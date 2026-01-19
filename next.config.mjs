// /** @type {import('next').NextConfig} */
// const nextConfig = {
//    images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'res.cloudinary.com',
//         port: '',
//         pathname: '/**',
//       },
//     ],
//   },/* config options here */
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: Uncomment output: "export" for production build (Hostinger)
  // output: "export",           // REQUIRED for Hostinger shared hosting
  trailingSlash: true,        // Prevent 404 issues

  images: {
    unoptimized: true,        // REQUIRED for static export
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;