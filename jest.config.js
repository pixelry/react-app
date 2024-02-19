const path = require("path");

module.exports = {
  rootDir: path.resolve("."),
  transform: {
    "\\.js$": [
      "babel-jest",
      {
        configFile: path.resolve(__dirname, "./babel/js.config.js"),
      },
    ],
    "\\.jsx$": [
      "babel-jest",
      {
        configFile: path.resolve(__dirname, "./babel/jsx.config.js"),
      },
    ],
    "\\.ts$": [
      "babel-jest",
      {
        configFile: path.resolve(__dirname, "./babel/ts.config.js"),
      },
    ],
    "\\.tsx$": [
      "babel-jest",
      {
        configFile: path.resolve(__dirname, "./babel/tsx.config.js"),
      },
    ],
  },
};
