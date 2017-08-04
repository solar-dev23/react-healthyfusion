var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var precss       = require('precss');
var autoprefixer = require('autoprefixer');

const NODE_ENV = process.env.NODE_ENV || 'development';

var SRC_PATH = path.resolve(__dirname, 'src');
var COMPONENTS_PATH = path.resolve(SRC_PATH, 'components');
var PAGES_PATH = path.resolve(SRC_PATH, 'pages');
var COMMON_CSS_PATH = path.resolve(SRC_PATH, 'css');
var OLD_CSS_PATH = path.resolve(SRC_PATH, 'oldStyles');
var BUILD_PATH = path.resolve('public/build');
var IMAGE_PATH = path.resolve(SRC_PATH, 'img');
var NODE_MODULES_PATH = path.resolve('node_modules');

module.exports = {
    devtool: NODE_ENV == 'development' ? 'eval-source-map' : 'cheap-module-source-map',
    entry: path.resolve(SRC_PATH,'index.js'),

    output: {
        path: BUILD_PATH,
        publicPath: NODE_ENV == 'development' ? '/build/' : '',
        filename: 'bundle.js',
    },

    resolve: {
        extensions: ['', '.js', '.jsx', '.json'],
        modulesDirectories: ['src', 'node_modules']
    },

    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel',
                include: path.resolve('src'),
            },
            {
                test: /\.css/,
                include: [COMPONENTS_PATH, COMMON_CSS_PATH, OLD_CSS_PATH, NODE_MODULES_PATH],
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss?browsers=last 2 version'),
            },

            { test: /\.scss/, include: [COMPONENTS_PATH, PAGES_PATH], loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss?browsers=last 2 version!sass-loader')},
            { test: /\.json$/, loaders: ['json-loader'], include: NODE_MODULES_PATH },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg|woff|png|jpg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=[name].[ext]?[hash]" }
        ],
    },

    postcss: function () {
        return [precss, autoprefixer];
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(NODE_ENV)
            }
        }),
        new ExtractTextPlugin("styles.css"),
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ],

    devServer: {
        contentBase: path.resolve('public'),
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        port: 4000
        // host: '10.10.10.68'
    }

};

if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            output: {comments: false},
            minimize: true
        }),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.NoErrorsPlugin())
}

if (NODE_ENV == 'development') {
    module.exports.plugins.push(new webpack.HotModuleReplacementPlugin())
}