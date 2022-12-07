const path = require('path');

const OUTPUT_DIR = path.resolve(process.cwd(), './source/list/static');

const prodConfig = {
    mode: 'production',
    target: 'web',
    entry: {
        web_index: './list/frontend/page/index.js'
    },
    output: {
        path: OUTPUT_DIR,
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[name].js'
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