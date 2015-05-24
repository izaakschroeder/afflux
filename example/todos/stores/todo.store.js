import { Map, fromJS } from 'immutable';
import { merge, map, flatMapError } from 'most';
import { map as xmap } from 'lodash';

import accumulate from 'afflux/lib/combinators/accumulate';
import update from 'afflux/lib/combinators/update';

/**
 * Create a new source of data for a view. This source must act like a `most`
 * stream, meaning it is an object with a single property `source`. Adding
 * an `id` property is also handy.
 * @param {*} actions Arbitrary set of actions the result is derived from.
 * @param {*} initialValue Initial value for the store.
 * @returns {Stream} Resulting data.
 */
export default function createStore(actions, initialValue) {

	const all = merge(
		update((todos, todo) => todos.set(todo.id, todo), actions.create),
		update((_, todos) => todos, actions.hydrate)
	);

	const s = flatMapError(() => all, all);

	const initialValue = base ? fromJS(base) : Map();

	const stream = map(entry => entry.toJS(), accumulate(initialValue, s));

	// This lets you do things like invoke todos.create(); note that stream
	// functionality must be invoked foo(stream) and not stream.foo(); since
	// all the actions are being used now.
	return { ...actions, source: stream.source, id: 'todo' };
}
