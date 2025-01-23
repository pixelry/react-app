const path = require('path');
const common = require('./webpack.common.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { existsSync } = require('fs');

module.exports = (env, options) => {
  // get the entry point file path
  let entry = options?.entry;
  if (!entry) {
    entry = './src/server.tsx';
    if (!existsSync(entry)) {
      entry = './server.tsx';
    }
  }

  return {
    ...common(env, options),
    entry,
    output: {
      filename: 'server.js',
      path: path.resolve('.', 'out'),
      libraryTarget: 'umd',
      globalObject: 'this',
      publicPath: '/',
      clean: true,
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name]-[contenthash:5].css',
      }),
    ],
    externals: {},
  };
};
