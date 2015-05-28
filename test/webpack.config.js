
var glob = require('glob');
var path = require('path');
var _ = require('lodash');
var fs = require('fs');
var webpack = require('webpack');

var node_modules = fs.readdirSync(path.join(__dirname, '..', 'node_modules')).filter(function(x) {
	return x !== '.bin'
});


module.exports = {
	target: 'node',
	entry: {
		test: _.flatten([
			glob.sync(path.join(__dirname, 'helpers', '*.js')),
			glob.sync(path.join(__dirname, 'spec', '**', '*.spec.js'))
		])
	},
	output: {
		filename: 'test.js',
		path: path.join(__dirname, 'build')
	},
	module: {
		loaders: [{
			test: /\.js$/,
			include: /lib/,
			loader: 'istanbul-instrumenter-loader'

		}, {
			test: /\.js$/,
			exclude: /node_modules/,
			loaders: [
				'babel-loader?optional[]=runtime&optional[]=optimisation.react.constantElements&optional[]=es7.classProperties&optional[]=es7.decorators'
			]
		}]
	},
	externals: function(context, request, cb) {
		if (node_modules.indexOf(request) !== -1) {
			cb(null, 'commonjs ' + request);
			return;
		}
		cb();
	},
	plugins: [
		new webpack.BannerPlugin('require("source-map-support").install();', {
			raw: true,
			entryOnly: false
		})
	],
	devtool: 'source-map'
};
