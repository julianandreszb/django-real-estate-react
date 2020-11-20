const path = require('path');
const {DefinePlugin} = require('webpack');
const dotenv = require('dotenv');
module.exports = {
    // Where Webpack looks to load your JavaScript
    entry: {
        main: path.resolve(__dirname, 'src/index.js'),
    },
    mode: 'development',
    output: {
        path: path.resolve(__dirname, './static/frontend/'),
        filename: '[name].js',
    },
    plugins: [
        // Don't output new files if there is an error
        // new webpack.NoEmitOnErrorsPlugin(),
        new DefinePlugin({
            'process.env': JSON.stringify(dotenv.config().parsed)
        })
    ],
    // Where find modules that can be imported (eg. React)
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        modules: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules'),
        ],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};