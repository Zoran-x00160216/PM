module.exports = {
  //...
  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      // os: require.resolve("os-browserify/browser"),
      stream: require.resolve("stream-browserify"),
      // buffer: require.resolve("buffer"),
      path: require.resolve("path-browserify"),
      querystring: require.resolve("querystring-es3"),
    },
  },
};
