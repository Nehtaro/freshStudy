const path = require('path');

module.exports = {
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    mode: process.env.NODE_ENV,
    devServer: {
        contentBase: path.resolve(__dirname, './client/assets'),
        compress: true,
        publicPath: 'http://localhost:8080/build/',
        historyApiFallback: true,
        proxy: {
          '/': 'http://localhost:3000',
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            },
            {
                test: /(css|scss)$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|svg|ico)$/,
                use: [
                    {
                        // loads files as base64 encoded data url if image file is less than set limit
                        loader: "url-loader",
                        options: {
                            // if file is greater than the limit (bytes), file-loader is used as fallback
                            limit: 90000
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
