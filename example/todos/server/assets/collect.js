
import _ from 'lodash';
import path from 'path';

export default function collect(root, stats) {
	return _.chain(stats.chunks)
		// Order the chunks so commons chunks come first.
		.sort(function orderEntryLast(a, b) {
			if (a.entry !== b.entry) {
				return b.entry ? 1 : -1;
			} else {
				return b.id - a.id;
			}
		})
		// Get all the files.
		.pluck('files')
		// Squash.
		.flatten()
		// Use publicPath as the base.
		.map(function rebase(file) {
			return path.join(root, file);
		})
		// Organize by type.
		.groupBy(function group(file) {
			if (/\.js$/.test(file)) {
				return 'scripts';
			} else if (/\.css$/.test(file)) {
				return 'styles';
			} else {
				return 'other';
			}
		})
		// Output.
		.value();
}
