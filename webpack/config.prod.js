const express = require('express');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const globImporter = require('node-sass-glob-importer');
const webpack = require('webpack');


const getPlugins = () => {
    const plugins = [
        new CleanWebpackPlugin('dist', {
            root: __dirname + '/../'
        }),
        new CopyWebpackPlugin([
            {
                from: __dirname + '/../src/assets/',
                to: __dirname + '/../dist/assets/'
            }
        ]),
        new ExtractTextPlugin({
            filename: './css/styles.css',
            allChunks: true
        }),
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
      })
    ];
    fs.readdirSync('./src/html/').forEach(filename => {
        if (filename.substr(0, 1) !== '_') {
            const splitted = filename.split('.');
            if (splitted[1] === 'html') {
                plugins.push(
                    new HtmlWebpackPlugin({
                        template: `./src/html/${filename}`,
                        filename: `./${filename}`
                    }),
                );
            }
        }
    });

    return plugins;
};

module.exports = {
    entry: [
        './src/js/app.js',
        './src/scss/app.scss',
    ],
    output: {
        filename: './js/bundle.js',
    },
    plugins: getPlugins(),
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(css|scss)$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                url: false
                            }
                        }, {
                            loader: "postcss-loader",
                            options: {
                                ident: 'postcss',
                                plugins: () => [
                                    require('autoprefixer')({
                                        browsers: ['ie >= 8', 'last 4 version']
                                    }),
                                    require('cssnano')()
                                ]
                            }
                        },
                        {
                          loader: 'sass-loader',
                          options: {
                              importer: globImporter(),
                              sourceMap: true
                          }
                        }

                    ]
                })
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jpg', '.html', '.scss'],
    }
};
