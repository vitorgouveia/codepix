/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir:
    process.env.NODE_ENV !== 'production'
      ? `.${process.env.NEXT_PUBLIC_BANK_CODE}-next`
      : '.next',
  async redirects() {
    return [{ source: '/', destination: '/bank-accounts', permanent: false }];
  },
};

module.exports = nextConfig;
