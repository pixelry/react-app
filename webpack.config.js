const fs = require('fs');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common.config');
const htmlFile = fs.existsSync('./index.ejs');
const tailwindFile = fs.existsSync('./tailwind.config.js');

const package = JSON.parse(
  fs.readFileSync(path.join(__dirname, './package.json'), 'utf-8'),
);
const deps = Object.keys(package.dependencies);
const vendor = new RegExp(`[\\/]node_modules[\\/](${deps.join('|')})`);

module.exports = env => {
  return {
    ...common(env),
    entry: {
      main: {
        import: [
          './index.tsx',
          ...(tailwindFile ? [path.resolve(__dirname, './index.css')] : []),
        ],
      },
    },

    output: {
      filename: '[name]-[contenthash:5].js',
      path: path.resolve('.', 'dist'),
      publicPath: '/',
    },

    optimization: {
      ...(env.production ? {} : { runtimeChunk: 'single' }),
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: vendor,
            name: 'vendor',
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },

    plugins: [
      ...(env.production
        ? []
        : [
            new ReactRefreshWebpackPlugin({
              exclude: vendor,
            }),
          ]),

      new HtmlWebpackPlugin({
        minify: { collapseWhitespace: false },
        template: htmlFile
          ? './index.ejs'
          : path.resolve(__dirname, './index.ejs'),
        filename: 'index.html',
        templateParameters: {
          reactDiv: '<div id="main"></div>',
        },
      }),

      new MiniCssExtractPlugin({
        filename: '[name]-[contenthash:5].css',
      }),

      new CopyPlugin({
        patterns: [
          {
            from: './static',
            to: `./`,
            noErrorOnMissing: true,
          },
        ],
      }),
    ],
    devServer: {
      port: 8888,
      host: '0.0.0.0',
      historyApiFallback: {
        index: '/index.html',
        verbose: true,
      },
    },

    watchOptions: {
      poll: 500,
    },
  };
};
