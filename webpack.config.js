const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpack = require('webpack');
const deps = require('./package.json').dependencies;
const env = process.env.NODE_ENV || 'development';

const getRemotes = require('./utils').getRemotes;

const services = [
  {
    url: 'http://localhost:5007/',
    endpoint: 'widget/levels',
    name: 'mf7Levels',
  },
];

module.exports = {
  entry: './src/index',
  cache: false,

  mode: 'development',
  devtool: 'source-map',

  optimization: {
    minimize: false,
  },

  output: {
    publicPath: env === 'production' ? '/widget/create-payment/' : 'auto',
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
        ],
      },
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'mf5CreatePayment',
      filename: 'remoteEntry.js',
      remotes: getRemotes(services),
      exposes: {
        './MF5CreatePayment': './src/components/CreatePayment',
        './MF5Bundle': './src/components/Bundle',
      },
      shared: {
        ...deps,
        react: {
          eager: true,
          singleton: true,
        },
        'react-dom': {
          singleton: true,
          eager: true,
        },
        antd: {
          eager: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['main'],
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru|en-gb/),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
