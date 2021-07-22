/**
 * Created by yh on 2021/7/18
 */
const base = require('./webpack.base');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const config = require('./config');
const {merge} = require("./util");
const upperCamelCase = require('uppercamelcase');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const AppendEslintDisablePlugin = require('./WebpackPlugin/AppendEslintDisablePlugin');
console.log('\x1B[32m%s\x1B[39m', 'start build layouts');

let externals = config.externals;
Object.keys(config.packages).forEach((key) => {
    externals[`../../packages/${upperCamelCase(key)}`] = `./packages/${key}`;
    // externals[`../packages/${upperCamelCase(key)}`] = `./packages/${key}`;
});
Object.keys(config.options).forEach((key) => {
    externals[`../../options/${key}`] = `./options/${key}`;
});
externals['../../packages/TopologyBody'] = './packages/topology-body';
externals['element-uinpm/lib/theme-chalk/index.css'] = './css/element-ui-demand.css'
externals['../../styles/css/ts-icon.css'] = './css/ts-icon.css'
externals['../../index'] = './index'
// externals['../topology'] = './topology-editor'
// externals['element-ui'] = './packages/element-ui-demand'
externals['mavon-editor'] = './vendor/mavon-editor.js'
console.log(externals)
config.bundleAnalyzerPluginOptions.reportFilename = 'report-layout.html';
let webpack = {
    entry: config.layouts,
    externals: externals,
    output: {
        path: path.resolve(process.cwd(), './lib'),
        publicPath: '',
        filename: '[name].js',
        chunkFilename: '[id].js',
        libraryTarget: 'commonjs2',
    },
    stats: {
        children: false,
    },
    optimization: {
        splitChunks: {
            cacheGroups:{
                elementUI: {
                    name: 'elementUI', // split elementUI into a single package
                    // fileName : 'elem',
                    priority: 10, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                    test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
            }
        },
    },
    module: {
        rules: [
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            esModule: true
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
                    esModule: true,
                    limit: 10000,
                    name: path.posix.join('./fonts', 'topology-[name].[ext]')
                }
            }
        ]
    },
    plugins: [
        new BundleAnalyzerPlugin(config.bundleAnalyzerPluginOptions),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "[id].css"
        }),
        new CopyPlugin([
            {from: path.join(__dirname, "../src/styles/css/ts-icon.css"), to: "./css/ts-icon.css"},
            {
                from:path.join(__dirname, "../node_modules/mavon-editor/dist/mavon-editor.js"),
                to : './vendor/mavon-editor.js',
                transform(content) {
                    return new AppendEslintDisablePlugin().handleAppend(content);
                },
            },
            {
                from: path.join(__dirname, "../src/styles/fonts/ts-icon.*"),
                to: "./fonts/ts-icon.[ext]"
            },
        ])
    ]
}
module.exports = merge(base, webpack);