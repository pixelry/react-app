const path = require('path');
const common = require('./webpack.common.config');
const { existsSync } = require('fs');

module.exports = env => {
  // get the entry point file path
  let entry = './src/server.tsx';
  if (!existsSync(entry)) {
    entry = './server.tsx';
  }

  return {
    ...common(env),
    entry,
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
