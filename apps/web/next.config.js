/** @type {import('next').NextConfig} */
const withTranspileModules = require("next-transpile-modules")([
  "@packages/firebase",
]);

module.exports = withTranspileModules({
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
});
