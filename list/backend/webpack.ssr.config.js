const path = require('path');

const OUTPUT_DIR = path.resolve(__dirname, './build');

const ssrConfig = {
    mode: 'development',
    devtool: "cheap-module-source-map",
    target: 'node',
    entry: {
        ssr_index: './list/backend/page/index.js'
    },
    output: {
        path: OUTPUT_DIR,
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[name].js',
        library: {
            name: 'ssr',
            type: 'umd'
        }
    },
    stats: {
        preset: 'minimal'
    },
    module: {
        rules: [{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            }]
        }]
    }
};

module.exports = ssrConfig;