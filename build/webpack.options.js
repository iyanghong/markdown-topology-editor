/**
 * Created by yh on 2021/7/18
 */
const base = require('./webpack.base');
const config = require('./config');
const path = require('path');
const {merge} = require("./util");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const upperCamelCase = require('uppercamelcase');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
console.log('\x1B[32m%s\x1B[39m','start build options');

let externals = config.externals;
Object.keys(config.packages).forEach( (key) =>{
    externals[`../packages/${upperCamelCase(key)}`] = `../packages/${key}`;
});

config.bundleAnalyzerPluginOptions.reportFilename = 'report-options.html';
let webpack = {
    entry: config.options,
    output: {
        path: path.resolve(process.cwd(), './lib/options'),
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[id].js',
        libraryTarget: 'commonjs2'
    },
    externals:externals,
    module:{
        rules : [
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '',
                            esModule : true
                        }
                    },
                    'css-loader',
                    // 'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(svg|otf|ttf|woff2?|eot)(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                    esModule: false,
                    limit: 10000,
                    name: path.posix.join('../fonts', 'topology-[name].[ext]')
                }
            }
        ]
    },
    plugins : [
        new BundleAnalyzerPlugin(config.bundleAnalyzerPluginOptions),
        new MiniCssExtractPlugin({
            filename: "../css/[name].css",
            chunkFilename: "[id].css"
        })
    ]
};
module.exports = merge(base,webpack);
