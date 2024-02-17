const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const tailwindConfig = require(path.resolve('.', './tailwind.config.js'));
const babelConfig = require(path.resolve(__dirname, './babel.config.js'));

module.exports = env => {
  const common = {
    mode: env.production ? 'production' : 'development',
    devtool: env.production ? undefined : 'source-map',
    node: false,

    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          use: {
            loader: path.resolve(__dirname, '../../babel-loader'),
            options: {
              presets: babelConfig.presets,
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            env.production ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: path.resolve(__dirname, '../../css-loader'),
              options: {
                url: false,
              },
            },
            {
              loader: path.resolve(
                __dirname,
                '../../postcss-loader',
              ),
              options: {
                postcssOptions: {
                  config: path.resolve(__dirname, './postcss.config.js'),
                },
              },
            },
          ],
        },
      ],
    },

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },

    devServer: {
      port: 8888,
      host: '0.0.0.0',
      historyApiFallback: {
        index: '/index.html',
        verbose: true,
      },
    },
  };

  // app config
  const configs = [
    {
      ...common,
      entry: {
        main: {
          import: ['./index.tsx', path.resolve(__dirname, './index.css')],
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
              test(module) {
                return (
                  module?.resource &&
                  module.resource.match(/[\\/]node_modules[\\/](?!@workspace)/)
                );
              },
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
                exclude: /[\\/]node_modules[\\/](?!@workspace)/,
              }),
            ]),

        new HtmlWebpackPlugin({
          minify: { collapseWhitespace: false },
          template: path.resolve(__dirname, './index.ejs'),
          filename: 'index.html',
          templateParameters: {
            light: tailwindConfig?.theme?.colors?.light ?? '#ffffff',
            dark: tailwindConfig?.theme?.colors?.dark ?? '#000000',
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
    },
  ];

  // static rendering config
  if (env.production) {
    configs.push({
      ...common,
      entry: './static.tsx',
      output: {
        filename: 'static.js',
        path: path.resolve('.', 'out'),
        libraryTarget: 'umd',
        globalObject: 'this',
        publicPath: '/',
        clean: true,
      },
      externals: {},
    });
  }

  return configs;
};
