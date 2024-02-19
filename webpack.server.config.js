const path = require('path');
const common = require('./webpack.common.config');

module.exports = env => {
  return {
    ...common(env),
    entry: './server.tsx',
    output: {
      filename: 'server.js',
      path: path.resolve('.', 'out'),
      libraryTarget: 'umd',
      globalObject: 'this',
      publicPath: '/',
      clean: true,
    },
    externals: {},
  };
};
