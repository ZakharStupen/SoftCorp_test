module.exports = (env) => {
  const wpConfig = {
    mode: !!env ? env : 'development',
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
        },
      ],
    },
  };
  return wpConfig;
};
