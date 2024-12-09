const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/js/script.js', // Main page JavaScript
        join: './src/js/join.js',  // Join page JavaScript
    },
    output: {
        filename: '[name].bundle.js', // Dynamic naming for output files
        path: path.resolve(__dirname, 'dist'), // Output folder
        clean: true, // Clean the dist folder before building
    },
    module: {
        rules: [
            {
                test: /\.m?js$/, // For JavaScript files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'], // Transpile modern JS
                    },
                },
            },
            {
                test: /\.css$/, // For CSS files
                use: ['style-loader', 'css-loader'], // Apply CSS to DOM
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/html/index.html', // Template for the main page
            filename: 'index.html', // Output file
            chunks: ['main'], // Include only main script
        }),
        new HtmlWebpackPlugin({
            template: './src/html/join.html', // Template for the join page
            filename: 'join.html', // Output file
            chunks: ['join'], // Include only join script
        }),
    ],
    mode: 'development', // Change to 'production' for optimized builds
    devtool: 'inline-source-map', // Helpful for debugging
};
