const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
module.exports = {
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
};

module.exports = withPWA({
  pwa: {
    dest: "public",
    runtimeCaching,
  },
});
