const fs = require('fs');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const jsOptions = require('./babel/js.config.js');
const jsxOptions = require('./babel/jsx.config.js');
const tsOptions = require('./babel/ts.config.js');
const tsxOptions = require('./babel/tsx.config.js');

const package = JSON.parse(
  fs.readFileSync(path.join(__dirname, './package.json'), 'utf-8'),
);
const deps = Object.keys(package.dependencies);
const vendor = new RegExp(`[\\/]node_modules[\\/](${deps.join('|')})`);

module.exports = (env, options) => {
  const cssModules = options?.cssModules ?? /\.module\.css$/;

  // get the tailwind file path
  let tailwind = options?.tailwind;
  if (!tailwind) {
    tailwind = './tailwind.config.js';
  }
  const useTailwind = fs.existsSync(tailwind);

  return {
    mode: env.production ? 'production' : 'development',
    devtool: env.production ? undefined : 'source-map',
    node: false,

    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: vendor,
          use: {
            loader: path.resolve(__dirname, '../../babel-loader'),
            options: jsOptions,
          },
        },
        {
          test: /\.jsx?$/,
          exclude: vendor,
          use: {
            loader: path.resolve(__dirname, '../../babel-loader'),
            options: jsxOptions,
          },
        },
        {
          test: /\.ts?$/,
          exclude: vendor,
          use: {
            loader: path.resolve(__dirname, '../../babel-loader'),
            options: tsOptions,
          },
        },
        {
          test: /\.tsx?$/,
          exclude: vendor,
          use: {
            loader: path.resolve(__dirname, '../../babel-loader'),
            options: tsxOptions,
          },
        },
        ...(useTailwind
          ? [
              {
                test: /\.css$/,
                exclude: [vendor, cssModules],
                use: [
                  env.production ? MiniCssExtractPlugin.loader : 'style-loader',
                  {
                    loader: path.resolve(__dirname, '../../css-loader'),
                    options: {
                      url: false,
                    },
                  },
                  {
                    loader: path.resolve(__dirname, '../../postcss-loader'),
                    options: {
                      postcssOptions: {
                        config: path.resolve(__dirname, './postcss.config.js'),
                      },
                    },
                  },
                ],
              },
            ]
          : []),
        {
          test: cssModules,
          exclude: vendor,
          use: [
            env.production ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: path.resolve(__dirname, '../../css-loader'),
              options: {
                modules: true,
              },
            },
          ],
        },
      ],
    },

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '*.css'],
    },

    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  };
};
