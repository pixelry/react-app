const fs = require('fs');
const path = require('path');

const configFile = fs.existsSync('./tailwind.config.js');

module.exports = {
  plugins: {
    tailwindcss: {
      config: configFile
        ? './tailwind.config.js'
        : path.join(__dirname, './tailwind.config.js'),
    },
    autoprefixer: {},
  },
};
