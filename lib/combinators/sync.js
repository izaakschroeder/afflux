import { sample } from 'most';
import { keys, values, object } from 'lodash';

/**
 * Given a mapping of keys to streams, create a new stream that outputs objects
 * with the same keys mapped to the present value of their respective streams.
 * The update only occurs `sampler`.
 * @param {Stream} sampler Stream used to trigger updates on output.
 * @param {Object} streams Objects input stream.
 * @returns {Stream} Resultant stream.
 */
export default function sync(sampler, streams) {
	const k = keys(streams);
	sample((...props) => {
		return object(k, props);
	}, sampler, ...values(streams));
}
