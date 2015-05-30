
import { renderToString } from 'react';
import { take } from 'most';
import last from './combinators/last';
import pipeline from './combinators/pipeline';
import { assign } from 'lodash';


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
 * @param {Number} options.limit Maximum number of render passes to make.
 * @param {Boolean} options.state Include state in output.
 * @returns {Promise} Rendered result.
 */
export default function render(component, watch, options) {

	function renderer() {
		return renderToString(component);
	}

	// Defaults
	options = assign({
		limit: 10,
		state: true
	}, options);

	const renders = pipeline(renderer, watch);
	return last(take(options.limit, renders));
}
