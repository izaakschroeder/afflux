
import { await, create, of as just, until, filter, merge } from 'most';
import { defer, isFunction } from 'lodash';
import empty from './empty';

/**
 * Determine whether or not an object is "promise-like".
 * @param {*} obj Object in question.
 * @returns {Boolean} True if promise-like, false otherwise.
 */
function isPromise(obj) {
	return obj && isFunction(obj.then);
}

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
			const events = until(parent, watch);
			const promises = await(filter(isPromise, events));

			// So if anything has happened on the actions then keep processing,
			// otherwise we're safe to end the stream. Just pass up any errors
			// that occur. If there are no more listeners on the stream then
			// also stop processing.
			empty(merge(events, promises))
				.then(none => none || done ? defer(end) : chunk())
				.catch(err);

			// Invoke callback on the next tick. Invoking on the same tick
			// causes an infinite loop.
			defer(() => {
				let val;
				try {
					val = callback();
				} catch(e) {
					return err(e);
				}
				console.log('adding', val);
				add(val);
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
