const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    entry: {
        cssLearn: "./src/client/css/index.tsx",
        cssPackage: "./src/client/css/packages/index.tsx",
        cssCustomers: "./src/client/css/customers/index.tsx",
        scssLearn: "./src/client/scss/index.ts",
        es6Learn: "./src/client/es6/main.js",
        terminalLearn: "./src/client/terminal.ts",
        reactReduxTodo: "./src/client/react/todo/index.tsx",
        reactVehicles: "./src/client/react/vehicles/App.tsx",
        reactLifecycle: "./src/client/react/lifecycle/App.tsx",
        tsReactLesson01Lecture: "./src/client/react/training/lesson01/lecture/App.tsx",
        tsReactLesson01Exercise: "./src/client/react/training/lesson01/exercise/App.tsx",
        tsReactLesson02Lecture: "./src/client/react/training/lesson02/lecture/App.tsx",
        tsReactLesson02Exercise: "./src/client/react/training/lesson02/exercise/App.tsx",
        tsReactLesson03Lecture: "./src/client/react/training/lesson03/lecture/App.tsx",
        tsReactLesson03Exercise: "./src/client/react/training/lesson03/exercise/App.tsx",
        tsReactLesson04Lecture: "./src/client/react/training/lesson04/lecture/App.tsx",
        tsReactLesson04Exercise: "./src/client/react/training/lesson04/exercise/App.tsx",
        tsReactLesson05Lecture: "./src/client/react/training/lesson05/lecture/App.tsx",
        tsReactLesson05Exercise: "./src/client/react/training/lesson05/exercise/App.tsx",

        tsReactLesson06Exercise: "./src/client/react/training/lesson06/exercise/App.tsx"

        // reReactLesson01Lecture: "./src/client/reasonml/training/lesson01/lecture/Lecture01.re"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-[hash:8]-bundle.js',
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
                test: /\.jsx?$/,
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
                            destDir: "./src/client/reasonml/css"
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
            },
            {
                test: /\.(html)$/,
                use: ['html-loader']
            }
        ]

    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "terminal.html",
            template: "src/client/terminal.html",
            chunks: ['terminalLearn']
        }),
        new HtmlWebpackPlugin({
            filename: "reactReduxTodo.html",
            template: "src/client/react/todo/index.html",
            chunks: ['reactReduxTodo']
        }),
        new HtmlWebpackPlugin({
            filename: "reactVehicles.html",
            template: "src/client/react/vehicles/index.html",
            chunks: ['reactVehicles']
        }),
        new HtmlWebpackPlugin({
            filename: "lifecycle.html",
            template: "src/client/react/lifecycle/index.html",
            chunks: ['reactLifecycle']
        }),
        new HtmlWebpackPlugin({
            filename: "ts/training/01_lecture.html",
            template: "src/client/react/index.html",
            chunks: ['tsReactLesson01Lecture']
        }),
        new HtmlWebpackPlugin({
            filename: "ts/training/01_exercise.html",
            template: "src/client/react/index.html",
            chunks: ['tsReactLesson01Exercise']
        }),
        new HtmlWebpackPlugin({
            filename: "ts/training/02_lecture.html",
            template: "src/client/react/index.html",
            chunks: ['tsReactLesson02Lecture']
        }),
        new HtmlWebpackPlugin({
            filename: "ts/training/02_exercise.html",
            template: "src/client/react/index.html",
            chunks: ['tsReactLesson02Exercise']
        }),
        new HtmlWebpackPlugin({
            filename: "ts/training/03_lecture.html",
            template: "src/client/react/index.html",
            chunks: ['tsReactLesson03Lecture']
        }),
        new HtmlWebpackPlugin({
            filename: "ts/training/03_exercise.html",
            template: "src/client/react/index.html",
            chunks: ['tsReactLesson03Exercise']
        }),
        new HtmlWebpackPlugin({
            filename: "ts/training/04_lecture.html",
            template: "src/client/react/index.html",
            chunks: ['tsReactLesson04Lecture']
        }),
        new HtmlWebpackPlugin({
            filename: "ts/training/04_exercise.html",
            template: "src/client/react/index.html",
            chunks: ['tsReactLesson04Exercise']
        }),
        new HtmlWebpackPlugin({
            filename: "ts/training/05_lecture.html",
            template: "src/client/react/index.html",
            chunks: ['tsReactLesson05Lecture']
        }),
        new HtmlWebpackPlugin({
            filename: "ts/training/05_exercise.html",
            template: "src/client/react/index.html",
            chunks: ['tsReactLesson05Exercise']
        }),
        new HtmlWebpackPlugin({
            filename: "ts/training/06_exercise.html",
            template: "src/client/react/index.html",
            chunks: ['tsReactLesson06Exercise']
        }),
        new HtmlWebpackPlugin({
            filename: "es6/index.html",
            template: "src/client/index.html",
            chunks: ['es6Learn']
        }),
        new HtmlWebpackPlugin({
            filename: "css/index.html",
            template: "src/client/css/index.html",
            chunks: ['cssLearn']
        }),
        new HtmlWebpackPlugin({
            filename: "css/packages/index.html",
            template: "src/client/css/packages/index.html",
            chunks: ['cssPackage']
        }),
        new HtmlWebpackPlugin({
            filename: "css/customers/index.html",
            template: "src/client/css/customers/index.html",
            chunks: ['cssCustomers']
        }),
        new HtmlWebpackPlugin({
            filename: "scss/index.html",
            template: "src/client/scss/index.html",
            chunks: ['scssLearn']
        })
    ],
    devServer: {
        port: 8081,
        inline: true,
        hot: true,
        proxy: {
            '/api': 'http://localhost:3000'
        }
    }
};