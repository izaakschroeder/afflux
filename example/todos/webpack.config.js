
var path = require('path'),
	mapValues = require('lodash/object/mapValues'),
	webpack = require('webpack'),
	ExtractStatsPlugin = require('extract-stats-webpack-plugin');

// Export the webpack configuration
var config = {
	entry: {
		app: path.join(__dirname, 'client')
	},

	output: {
		filename: '[name].js',
		publicPath: '/assets',
		path: path.join(__dirname, 'build'),
		chunkFilename: '[id].js'
	},

	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			include: /afflux|react-beam|react-observer/,
			loaders: [
				'babel-loader?optional[]=runtime&optional[]=optimisation.react.constantElements&optional[]=es7.classProperties&optional[]=es7.decorators&optional[]=es7.exportExtensions&optional[]=es7.objectRestSpread'
			]
		}, {
			test: /\.json5?$/i,
			loader: 'json5-loader'
		}]
	},

	resolve: {
		root: [
			path.join(__dirname, 'components'),
			path.join(__dirname, 'node_modules'),
		]
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env': mapValues(process.env, JSON.stringify)
		}),

		new webpack.ProgressPlugin(function progress(percentage, message) {
			var MOVE_LEFT = new Buffer('1b5b3130303044', 'hex').toString();
			var CLEAR_LINE = new Buffer('1b5b304b', 'hex').toString();
			process.stdout.write(
				CLEAR_LINE +
				Math.round(percentage * 100) +
				'%:' +
				message +
				MOVE_LEFT
			);
		}),

		new ExtractStatsPlugin('stats.json', {
			hash: true,
			assets: false,
			reasons: false,
			chunks: true,
			source: false
		})

	],

	devtool: 'source-map'
};

module.exports = config;
