const path = require('path');

const OUTPUT_DIR = path.resolve(__dirname, './build');

const prodConfig = {
    mode: 'production',
    entry: {
        component_index: './list/component/index.js'
    },
    output: {
        path: OUTPUT_DIR,
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[name].js',
        library: {
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

module.exports = prodConfig;