const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    entry: {
        antdLearn:"./src/main.tsx",
        terminalLearn:"./src/terminal.ts",
        reduxLearn:"./src/redux/main.tsx",
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename:'[name].js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.txt$/,
                loader: 'raw-loader',
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader","css-loader","sass-loader"]
            },
            {
                test:/\.css$/,
                loaders: ["style-loader","css-loader"]
            }
        ]

    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "src/index.html",
            chunks: ['antdLearn']
        }),
        new HtmlWebpackPlugin({
            filename:"terminal.html",
            template: "src/terminal.html",
            chunks: ['terminalLearn']
        }),
        new HtmlWebpackPlugin({
            filename:"redux.html",
            template: "src/redux/index.html",
            chunks: ['reduxLearn']
        })
    ],
    devServer: {
        inline: true,
        hot: true
    }
};