require("babel-polyfill");
const path = require("path");
const { DefinePlugin } = require("webpack");

module.exports = {
    entry: ["babel-polyfill", "./src/index.js"],
    target: 'web',
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 1024000
    },
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "index_bundle.js",
        publicPath: '/dist/'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            src: path.resolve(__dirname, 'src/'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    devtool: "source-map",
    devServer: {
        inline: true,
        disableHostCheck: true
    }
};