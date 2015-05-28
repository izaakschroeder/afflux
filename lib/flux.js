
import { assign, isEmpty } from 'lodash';
import invariant from 'react/lib/invariant';

/**
 * Class responsible for maintaining current state. Stores, actions, etc. are
 * all just streams, meaning they have no current value - only values at points
 * in time. Something is required to keep track of these things while the app
 * runs to new components can obtain the most recent value of stores and the
 * server can transfer the rendered state to the client.
 */
export default class Flux {

	constructor(options) {
		assign(this, options);

		invariant(!isEmpty(this.actions), 'Actions should not be empty.');
		invariant(!isEmpty(this.stores), 'Stores should not be empty.');
	}
}
