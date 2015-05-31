
import { await, create, until, map } from 'most';
import { defer } from 'lodash';
import { resolve } from 'bluebird';
import empty from './empty';

/**
 * Create a stream consisting of sequential invokations of `callback`. The watch
 * stream is observed for promises - if such promises occur their resolution is
 * waited for and callback is called again.
 * @param {Function} callback Function to be invoked.
 * @param {Stream} watch Most stream of promises.
 * @returns {Stream} Stream of mapped data.
 */
export default function createRenderStream(callback, watch) {
	const parent = create((add, end, err) => {
		let done = false;

		function chunk() {
			// Create two streams - one with all the events that have happened
			// since the last time we ran callback, and another which waits for
			// the results of any promises that happened to be emitted. This
			// allows waiting for the resolution of promises before proceeding
			// to the next invocation.
			const events = await(until(parent, map(resolve, watch)));

			// So if anything has happened on the actions then keep processing,
			// otherwise we're safe to end the stream. Just pass up any errors
			// that occur. If there are no more listeners on the stream then
			// also stop processing.
			empty(events)
				.then(none => none || done ? defer(end) : chunk())
				.catch(err);

			defer(() => {
				try {
					add(callback());
				} catch(error) {
					err(error);
				}
			});

		}

		// Lift off.
		chunk();

		// Set the done flag to true when everyone has stopped listening.
		return () => {
			done = true;
		};
	});

	return parent;
}
