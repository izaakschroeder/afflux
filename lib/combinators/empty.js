
import { reduce } from 'most';

/**
 * Return true if the stream is empty.
 * @param  {Stream} stream Stream whose emptiness to determine.
 * @returns {Promise} Resolved promise with the value.
 */
export default function empty(stream) {
	return reduce(() => false, true, stream);
}
