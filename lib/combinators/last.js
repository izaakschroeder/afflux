
import { reduce } from 'most';

/**
 * Collect the last value in a stream.
 * @param  {Stream} stream Stream whose last value to collect.
 * @returns {Promise} Promise resolved with that value.
 */
export default function last(stream) {
	return reduce((_, value) => value, void 0, stream);
}
