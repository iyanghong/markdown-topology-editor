/**
 * Created by yh on 2021/7/18
 */
/*const base = require('./webpack.base');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const config = require('./config');
const {merge} = require("./util");
const upperCamelCase = require('uppercamelcase');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const AppendEslintDisablePlugin = require('./WebpackPlugin/AppendEslintDisablePlugin');
console.log('\x1B[32m%s\x1B[39m', 'start build common');

let externals = config.externals;
/!*Object.keys(config.packages).forEach((key) => {
    externals[`../../packages/${upperCamelCase(key)}`] = `./packages/${key}`;
});
Object.keys(config.options).forEach((key) => {
    externals[`../../options/${key}`] = `./options/${key}`;
});*!/
// externals['element-ui/lib/theme-chalk/index.css'] = './css/element-ui-demand.css'
// externals['../../styles/css/ts-icon.css'] = './css/ts-icon.css'
// externals['./class-diagram'] = './packages/class-diagram'
// externals['../../index'] = './index'
// externals['element-ui'] = './packages/element-ui-demand'
// externals['mavon-editor'] = './vendor/mavon-editor.js'
config.bundleAnalyzerPluginOptions.reportFilename = 'report-common.html';
let webpack = {
    entry: {
        app: ['./src/index.js']
    },
    externals: externals,
    output: {
        path: path.resolve(process.cwd(), './lib'),
        publicPath: '',
        filename: 'markdown-topology-editor.common.js',
        chunkFilename: '[id].js',
        libraryExport: 'default',
        library: 'MARKDOWN_TOPOLOGY_EDITOR',
        libraryTarget: 'commonjs2',
    },
    stats: {
        children: false,
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
        /!*new CopyPlugin([
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
        ])*!/
    ]
}
module.exports = merge(base, webpack);*/
const WebpackBar = require('webpackbar');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');
const config = require('./config');
const AppendEslintDisablePlugin = require('./WebpackPlugin/AppendEslintDisablePlugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    mode: 'production',
    entry: {
        app: ['./src/index.js']
    },
    output: {
        path: path.resolve(process.cwd(), './lib'),
        publicPath: '',
        filename: 'markdown-topology-editor.common.js',
        chunkFilename: '[id].js',
        // libraryExport: 'default',
        // library: 'MARKDOWN_TOPOLOGY_EDITOR',
        libraryTarget: 'commonjs2',
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: config.alias,
        modules: ['node_modules']
    },
    performance: {
        hints: false
    },
    stats: {
        children: false
    },
    optimization: {
        minimizer: [
            /*{
                uglifyOptions: {
                    output: {
                        comments: false, // 去掉注释
                    },
                    warnings: false,
                    compress: {
                        drop_console: true,
                        drop_debugger: false,
                        pure_funcs: ['console.log']//移除console
                    }
                }
            }*/
            // new UglifyJsPlugin()
        ],
    },
    module: {
        rules: [
            {
                test: /\.(jsx?|babel|es6)$/,
                include: process.cwd(),
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
            },
            {
                test: /\.(css|scss)$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: path.posix.join('./fonts', 'topology-[name].[ext]')
                }
            }
        ]
    },
    plugins: [
        new AppendEslintDisablePlugin(),
        new WebpackBar(),
        new VueLoaderPlugin()
    ]
}
