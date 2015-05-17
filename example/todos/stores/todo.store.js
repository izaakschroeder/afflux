import { Map, fromJS } from 'immutable';
import { merge, map, await } from 'most';

/**
 * Create a new collection. Collections are streams that accumulate changes to
 * groups of objects over time. They take an initial value and, as events come
 * in, repeatedly update that value to reflect the current group of objects.
 * @param  {Object} base The initial value for the collection.
 * @param  {Array} actions Streams of functions that mutate the collection.
 * @return {Stream} Stream representing the resulting collection.
 */
function collection(base, actions) {
	// Merge all the actions into one stream.
	const all = merge(actions);
	return all
		// If there's an error, don't bother with it.
		.flatMapError(() => all)
		// Apply updates from the action stream to the value.
		.scan((prev, fn) => fn(prev), base);
}

/**
 * Create an update stream; it generates functions that update the current
 * collection value given the current value of the input stream and the given
 * function.
 * @param  {Stream} stream Stream containing input events.
 * @param  {Function} f Function to apply to every input and the collection.
 * @return {Stream} Resultant stream.
 */
function update(stream, f) {
	return map((item) => (base) => f(base, item), await(stream));
}

function derp(actions, updates) {
	const streams = map(updates, (value, key) => update(actions[key], value));
}

export default function createStore(actions, base) {
	const initialValue = base ? fromJS(base) : Map();
	return map(entry => entry.toJS(), collection(initialValue, [
		update(actions.create, (todos, todo) => todos.set(todo.id, todo))
    ]));
}
