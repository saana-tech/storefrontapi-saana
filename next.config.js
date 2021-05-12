const withPWA = require("next-pwa");

module.exports = withPWA({
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
