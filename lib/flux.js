
import assign from 'lodash/object/assign';

/**
 * Class responsible for maintaining current state. Stores, actions, etc. are
 * all just streams, meaning they have no current value - only values at points
 * in time.
 */
export default class Flux {

	constructor(options) {
		assign(this, options);
	}
	
	dispose() {
		// stop watching
	}

	/**
	 * Restore the state of the application.
	 */
	hydrate(data) {

	}

	/**
	 * Save the state of the application.
	 */
	dehydrate() {

	}

}
