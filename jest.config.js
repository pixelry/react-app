const path = require('path');

module.exports = {
  rootDir: path.resolve('.'),
  transform: {
    '\\.(js|ts)x?$': [
      'babel-jest',
      {
        configFile: path.resolve(__dirname, './babel.config.js'),
      },
    ],
  },
};
