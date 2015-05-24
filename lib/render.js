import { renderToString } from 'react';
import { await, create, take, of as just, during, reduce } from 'most';
import { assign, defer } from 'lodash';

/**
 * Return true if the stream is empty.
 * @param  {Stream} stream Stream whose emptiness to determine.
 * @returns {Promise} Resolved promise with the value.
 */
function empty(stream) {
	return reduce(() => {
		return false;
	}, true, stream);
}

/**
 * Collect the last value in a stream.
 * @param  {Stream} stream Stream whose last value to collect.
 * @returns {Promise} Promise resolved with that value.
 */
function last(stream) {
	return reduce((_, value) => {
		return value;
	}, null, stream);
}

/**
 * Create a stream consisting of sequential invokations of `callback`. The watch
 * stream is observed for promises - if such promises occur their resolution is
 * waited for and callback is called again.
 * @param {Stream} watch Most stream of promises.
 * @param {Function} callback Function to be invoked.
 * @returns {Stream} Stream of rendered data.
 */
function createRenderStream(watch, callback) {
	let parent = create((add, end, err) => {
		function chunk() {
			empty(await(during(just(parent), watch)))
				.then(none => none ? end() : chunk())
				.catch(err);

			// TODO: Why is this necessary?
			defer(() => {
				let val;
				try {
					console.log('render call');
					val = callback();
				} catch(e) {
					return err(e);
				}
				add(val);
			});
		}
		chunk();
	});
	return parent;
}

/**
 * Create a render function that builds up a React component that uses afflux
 * stores. A single render pass is made to the app with an initial state; this
 * then typically triggers several actions which update stores. These updates
 * are captured and then waited on after the render. Once all updates complete
 * (signalling a new app state) then another render pass is made. This process
 * repeats itself until either the max number of updates has been hit or there
 * are no more updates.
 *
 * IMPORTANT: This requires all asynchronous work happen in actions; if there
 * is async code in stores there is no way to capture that information.
 *
 * @param {Object} component React component.
 * @param {Object} options Configuration options.
 * @returns {Promise} Rendered result.
 */
export default function render(component, options) {

	// Defaults
	options = assign({
		limit: 10
	}, options);

	const renderer = () => renderToString(component);
	const watch = component.props.actions.todos.create;
	console.log('watch is', watch);
	const renders = createRenderStream(watch, renderer);
	return last(take(options.limit, renders));
}
