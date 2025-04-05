/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ビルド時のESLintチェックを無効化
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ビルド時のTypeScriptチェックを無効化
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig