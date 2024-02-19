module.exports = {
  presets: [
    "@babel/preset-typescript",
    ["@babel/preset-env", { targets: "last 1 versions, > 5%, not dead" }],
  ],
};
