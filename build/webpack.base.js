/**
 * Created by yh on 2021/7/20
 */
/**
 * Created by yh on 2021/7/18
 */
const config = require('./config');
const WebpackBar = require('webpackbar');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const AppendEslintDisablePlugin = require('./WebpackPlugin/AppendEslintDisablePlugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    mode: 'production',
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: config.alias,
        modules: ['node_modules']
    },
    performance: {
        hints: false
    },
    stats: 'none',
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    },
    module: {
        rules: [
            {
                test: /\.(jsx?|babel|es6)$/,
                include: process.cwd(),
                exclude: config.jsexclude,
                loader: 'babel-loader',
                query: {compact: false}
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            }
        ]
    },
    plugins: [
        new WebpackBar(),
        new VueLoaderPlugin(),
        new AppendEslintDisablePlugin(),

    ]
}