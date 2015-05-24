import { Map, fromJS } from 'immutable';
import { merge, map, flatMapError } from 'most';
import { map as xmap } from 'lodash';

import accumulate from 'afflux/lib/combinators/accumulate';
import update from 'afflux/lib/combinators/update';


function respond(actions, updates) {
	const streams = xmap(updates, (value, key) => update(actions[key], value));
	return merge(...streams);
}

export default function createStore(actions, base) {

	const all = respond(actions, {
		create: (todos, todo) => todos.set(todo.id, todo),
		hydrate: (_, todos) => todos
	});

	const initialValue = base ? fromJS(base) : Map();
	const s = flatMapError(() => all, all);
	const stream = map(entry => entry.toJS(), accumulate(initialValue, s));
	// This lets you do things like invoke todos.create(); note that stream
	// functionality must be invoked foo(stream) and not stream.foo(); since
	// all the actions are being used now.
	return { ...actions, source: stream.source };
}
