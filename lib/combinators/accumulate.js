import { scan } from 'most';

/**
 * Take a base object and accumulate changes to it over time by applying the
 * functions from `stream` to `base`. This is kind of like a combination of
 * apply and iterate.
 * @param {Object} base The initial value for the stream.
 * @param {Stream} stream Stream of functions that mutate the value.
 * @returns {Stream} Transformed stream.
 */
export default function accumulate(base, stream) {
	return scan((prev, fn) => fn(prev), base, stream);
}
