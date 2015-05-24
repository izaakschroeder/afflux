
import { await, create, of as just, during } from 'most';
import { defer } from 'lodash';
import empty from './empty';

/**
 * Create a stream consisting of sequential invokations of `callback`. The watch
 * stream is observed for promises - if such promises occur their resolution is
 * waited for and callback is called again.
 * @param {Stream} watch Most stream of promises.
 * @param {Function} callback Function to be invoked.
 * @returns {Stream} Stream of rendered data.
 */
export default function createRenderStream(watch, callback) {
	let parent = create((add, end, err) => {
		let done = false;

		function chunk() {
			empty(await(during(just(parent), watch)))
				.then(none => none || done ? end() : chunk())
				.catch(err);

			// TODO: Why is this necessary?
			defer(() => {
				let val;
				try {
					val = callback();
				} catch(e) {
					return err(e);
				}
				add(val);
			});
		}
		chunk();

		return () => {
			done = true;
		};
	});
	return parent;
}
