
import { map, await } from 'most';

/**
 * Create an update stream; it generates functions that update the current
 * collection value given the current value of the input stream and the given
 * function.
 * @param {Stream} stream Stream containing input events.
 * @param {Function} f Function to apply to every input and the collection.
 * @returns {Stream} Resultant stream.
 */
export default function update(f, stream) {
	return map((item) => (base) => f(base, item), await(stream));
}
