const webpack = require('webpack')
const merge = require('webpack-merge')
const spawn = require('child_process').spawn
const baseConfig = require('./webpack.electron.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge.smart(baseConfig, {
    target: 'electron-renderer',
    entry: {
        app: ['@babel/polyfill', './src/app/renderer/app.tsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    babelrc: false,
                    presets: [
                        [
                            '@babel/preset-env',
                            {targets: {browsers: 'last 2 versions '}}
                        ],
                        '@babel/preset-typescript',
                        '@babel/preset-react'
                    ],
                    plugins: [
                        ['@babel/plugin-proposal-class-properties', {loose: true}]
                    ]
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            disable: true
                        }
                    }
                ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ],
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },
    devServer: {
        port: 2003,
        compress: true,
        noInfo: true,
        stats: 'errors-only',
        inline: true,
        hot: true,
        headers: {'Access-Control-Allow-Origin': '*'},
        historyApiFallback: {
            verbose: true,
            disableDotRule: false
        },
        before() {
            if (process.env.START_HOT) {
                console.log('Starting main process');
                spawn('npm', ['run', 'start-electron-main-dev'], {
                    shell: true,
                    env: process.env,
                    stdio: 'inherit'
                }).on('close', code => process.exit(code))
                  .on('error', spawnError => console.error(spawnError));
            }
        }
    }
})
