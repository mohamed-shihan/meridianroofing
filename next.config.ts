import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [375, 768, 1024, 1280, 1440, 1920, 2560],
    imageSizes: [16, 32, 64, 128, 256, 384],
    qualities: [60, 75, 80, 85, 90, 95],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
}

export default nextConfig
