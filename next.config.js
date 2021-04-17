module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ["@svgr/webpack"],
    });

    return config;
  },
  env: {
    LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
    STRIPE_PUBLIC_ID: process.env.STRIPE_PUBLIC_ID,
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
  },
};
