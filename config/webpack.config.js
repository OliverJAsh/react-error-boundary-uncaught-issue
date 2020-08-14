const CopyWebpackPlugin = require('copy-webpack-plugin');
const pathHelpers = require('path');

// Expect `__dirname` to be `/config/`.
const ROOT_PATH = pathHelpers.resolve(__dirname, '..');
const TARGET_PATH = pathHelpers.join(ROOT_PATH, './target/');
const SRC_PATH = pathHelpers.join(ROOT_PATH, './src/');

const ENTRY_FILENAME = 'index.jsx';
const OUTPUT_FILENAME = 'index.js';

const config = {
    entry: pathHelpers.resolve(SRC_PATH, ENTRY_FILENAME),
    output: {
        path: TARGET_PATH,
        filename: OUTPUT_FILENAME,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: pathHelpers.resolve(SRC_PATH, './index.html'),
                    to: 'index.html',
                },
            ],
        }),
    ],
};

module.exports = config;
