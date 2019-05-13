const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    entry: {
        antdLearn: "./src/main.tsx",
        terminalLearn: "./src/terminal.ts",
        reactReduxTodo: "./src/react/todo/index.tsx",
        reactVehicles: "./src/react/vehicles/App.tsx",
        reactLifecycle: "./src/react/lifecycle/App.tsx",
        reasonMLLearn: "./src/reasonml/lang_learn/main.re",
        tsReactLesson01Lecture: "./src/react/training/lesson01/lecture/App.tsx",
        tsReactLesson01Exercise: "./src/react/training/lesson01/exercise/App.tsx",
        tsReactLesson02Lecture: "./src/react/training/lesson02/lecture/App.tsx",
        tsReactLesson02Exercise: "./src/react/training/lesson02/exercise/App.tsx",
        tsReactLesson03Lecture: "./src/react/training/lesson03/lecture/App.tsx",

        reReactLesson01Lecture: "./src/reasonml/training/lesson01/lecture/Lecture01.re"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.re', '.ml', '.png']
    },
    module: {
        rules: [
            {
                test: /\.txt$/,
                loader: 'raw-loader',
            },
            {
                test: /\.(re|ml)$/,
                loader: 'bs-loader'
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                include: [
                    path.resolve(__dirname, "src/reasonml")
                ],
                loaders: [
                    "style-loader",
                    {
                        loader: "reason-css-modules-loader",
                        query: {
                            destDir: "./src/reasonml/css"
                        }
                    },
                    "sass-loader"]
            },
            {
                test: /\.scss$/,
                exclude: [
                    path.resolve(__dirname, "src/reasonml")
                ],
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.css$/,
                exclude: [
                    path.resolve(__dirname, "src/reasonml")
                ],
                loaders: ["style-loader", "css-loader"]
            },
            {
                test: /\.png$/,
                use: [
                    {
                        loader: "base64-inline-loader"
                    }
                ]
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
            filename: "terminal.html",
            template: "src/terminal.html",
            chunks: ['terminalLearn']
        }),
        new HtmlWebpackPlugin({
            filename: "reactReduxTodo.html",
            template: "src/react/todo/index.html",
            chunks: ['reactReduxTodo']
        }),
        new HtmlWebpackPlugin({
            filename: "reasonMLLearn.html",
            template: "src/reasonml/index.html",
            chunks: ['reasonMLLearn']
        }),
        new HtmlWebpackPlugin({
            filename: "reactVehicles.html",
            template: "src/react/vehicles/index.html",
            chunks: ['reactVehicles']
        }),
        new HtmlWebpackPlugin({
            filename: "lifecycle.html",
            template: "src/react/lifecycle/index.html",
            chunks: ['reactLifecycle']
        }),
        new HtmlWebpackPlugin({
            filename: "reason_react.html",
            template: "src/reasonml/index.html",
            chunks: ['reasonReact']
        }),
        new HtmlWebpackPlugin({
            filename: "ts/training/01_lecture.html",
            template: "src/react/index.html",
            chunks: ['tsReactLesson01Lecture']
        }),
        new HtmlWebpackPlugin({
            filename: "ts/training/01_exercise.html",
            template: "src/react/index.html",
            chunks: ['tsReactLesson01Exercise']
        }),
        new HtmlWebpackPlugin({
            filename: "ts/training/02_lecture.html",
            template: "src/react/index.html",
            chunks: ['tsReactLesson02Lecture']
        }),
        new HtmlWebpackPlugin({
            filename: "ts/training/02_exercise.html",
            template: "src/react/index.html",
            chunks: ['tsReactLesson02Exercise']
        }),
        new HtmlWebpackPlugin({
            filename: "ts/training/03_lecture.html",
            template: "src/react/index.html",
            chunks: ['tsReactLesson03Lecture']
        }),
        new HtmlWebpackPlugin({
            filename: "re/training/01_lecture.html",
            template: "src/reasonml/training/index.html",
            chunks: ['reReactLesson01Lecture']
        }),
    ],
    devServer: {
        inline: true,
        hot: true
    }
};