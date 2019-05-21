const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    entry: {
        antdLearn: "./src/main.tsx",
        es6Learn: "./src/es6/main.js",
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
        tsReactLesson03Exercise: "./src/react/training/lesson03/exercise/App.tsx",
        tsReactLesson04Lecture: "./src/react/training/lesson04/lecture/App.tsx",
        tsReactLesson04Exercise: "./src/react/training/lesson04/exercise/App.tsx",
        tsReactLesson05Lecture: "./src/react/training/lesson05/lecture/App.tsx",
        tsReactLesson05Exercise: "./src/react/training/lesson05/exercise/App.tsx",

        tsReactLesson06Exercise: "./src/react/training/lesson06/exercise/App.tsx",

        reReactLesson01Lecture: "./src/reasonml/training/lesson01/lecture/Lecture01.re"
    },
    output: {
        path: path.resolve(__dirname, 'dist','statics'),
        filename: '[name]-[hash:8]-bundle.js',
        publicPath:'/statics/',
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
                test: /\.(png|jpe?g)$/,
                use: [
                    {
                        loader: "base64-inline-loader"
                    }
                ]
            },
            {
                test: /\.mp3$/,
                use: [
                    {
                        loader: "file-loader"
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
            filename: "ts/training/03_exercise.html",
            template: "src/react/index.html",
            chunks: ['tsReactLesson03Exercise']
        }),
        new HtmlWebpackPlugin({
            filename: "ts/training/04_lecture.html",
            template: "src/react/index.html",
            chunks: ['tsReactLesson04Lecture']
        }),
        new HtmlWebpackPlugin({
            filename: "ts/training/04_exercise.html",
            template: "src/react/index.html",
            chunks: ['tsReactLesson04Exercise']
        }),
        new HtmlWebpackPlugin({
            filename: "ts/training/05_lecture.html",
            template: "src/react/index.html",
            chunks: ['tsReactLesson05Lecture']
        }),
        new HtmlWebpackPlugin({
            filename: "ts/training/05_exercise.html",
            template: "src/react/index.html",
            chunks: ['tsReactLesson05Exercise']
        }),
        new HtmlWebpackPlugin({
            filename: "ts/training/06_exercise.html",
            template: "src/react/index.html",
            chunks: ['tsReactLesson06Exercise']
        }),
        new HtmlWebpackPlugin({
            filename: "re/training/01_lecture.html",
            template: "src/reasonml/training/index.html",
            chunks: ['reReactLesson01Lecture']
        }),
        new HtmlWebpackPlugin({
            filename: "es6/index.html",
            template: "src/index.html",
            chunks: ['es6Learn']
        }),
    ],
    devServer: {
        port: 8080,
        inline: true,
        hot: true
    }
};