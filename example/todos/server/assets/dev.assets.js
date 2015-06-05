
import collect from './collect';
import middleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import { assign } from 'lodash';
import config from '../../../webpack.config';

// webpack-dev-middleware options.
const options = {
	stats: {
		color: true
	}
};

// Setup
const compiler = webpack(config);
const route = middleware(compiler, options);

// Update assets whenever they're regenerated.
compiler.plugin('done', result => {
	const stats = result.toJson({
		hash: true,
		assets: false,
		reasons: false,
		chunks: true,
		source: false
	});
	const assets = collect(config.output.publicPath, stats);
	assign(route, assets);
});

// TODO: Hot module replacement.

// Return an instance of webpack-dev-middleware.
export default route;
