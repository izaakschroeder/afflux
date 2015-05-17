import { renderToString } from 'react';
import { merge, create } from 'most';
import flatten from 'lodash/array/flatten';
import values from 'lodash/object/values';
import map from 'lodash/collection/map';
/*
Render app.
It basically defaults to the "loading" state - results from stores haven't come back yet.
Collect all promises that resulted from intial render.
Wait for all promises to resolve (or timeout).
Re-render the app with the same stores/actions - they are now updated with the results from all the promises.
Collect all promises that resulted... repeat.
If no promises remain then output the result.

Considerations - can infinite loop; put sane default clamp to max number of iterations. Are the intermediate results good for anything?
*/

/**
 * Create a render function that builds up a React component that uses afflux
 * stores. A single render pass is made to the app with an initial state; this
 * then typically triggers several actions which update stores. These updates
 * are captured and then waited on after the render. Once all updates complete
 * (signalling a new app state) then another render pass is made. This process
 * repeats itself until either the max number of updates has been hit or there
 * are no more updates.
 *
 * Note: This requires all asynchronous work happen in actions; if there
 * is async code in stores there is no way to capture that information.
 *
 *
 * @param  {Object} options Configuration options.
 * @return {Function}       Render function.
 */
function renderer(options) {

	// Defaults
	options = assign({
		limit: 5
	}, options);

	var actions = { };

	const streams = merge(flatten(map(actions, values)));

	// Create a stream that goes to next ticket
	function nextTick() {
		return create((add, end) => {
			nextImmediate(() => {
				add();
				end();
			});
		});
	}

	function render(count, component) {
		// Render the content
		const content = renderToString();

		// Merge the streams.
		return streams
			// Basically we only care about events that have been generated
			// up to this point in time. Anything in the future will be caught
			// in the next pass. It would be nice if there was something
			// simpler than this.
			.until(nextTick())
			// Wait till all the promises have resolved. Note that await
			// goes to some lengths to preserve execution order, and we could
			// care less about it in this particular case.
			// TODO: Implement out-of-order version.
			.await()
			// I wish there was something simpler here, but basically just
			// detect if events were generated; if so emit true, otherwise
			// emit false.
			// TODO: Implement more logical function.
			.reduce(() => true, false)
			// Finally if events occured, re-render everything after they've
			// finished processing; otherwise just return the resulting
			// content. Also respect the loop limit (just in case).
			.then(more => {
				if (more && count < options.limit) {
					return render(count + 1, component);
				} else {
					return content;
				}
			});
	}

	return (component) => {
		render(0, component)
	};
}
