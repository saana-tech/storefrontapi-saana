const withPWA = require("next-pwa");
const withOffline = require("next-offline");
const nextConfig = withPWA({
  future: { webpack5: true },
  pwa: {
    dest: "public",
    fallbacks: {
      image: "/favicon.png",
    },
  },

  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
});
module.exports = withOffline(nextConfig);
