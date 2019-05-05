const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    entry: {
        antdLearn:"./src/main.tsx",
        terminalLearn:"./src/terminal.ts",
        reactReduxTodo:"./src/react/todo/index.tsx",
        reasonMLLearn:"./src/reasonml/main.re"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename:'[name].js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json','.re','.ml']
    },
    module: {
        rules: [
            {
                test: /\.txt$/,
                loader: 'raw-loader',
            },
            {
                test:/\.(re|ml)$/,
                loader:'bs-loader'
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
            filename:"reactReduxTodo.html",
            template: "src/react/todo/index.html",
            chunks: ['reactReduxTodo']
        }),
        new HtmlWebpackPlugin({
            filename:"reasonMLLearn.html",
            template: "src/reasonml/index.html",
            chunks: ['reasonMLLearn']
        })
    ],
    devServer: {
        inline: true,
        hot: true
    }
};