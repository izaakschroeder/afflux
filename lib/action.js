
import { create } from 'most';
import isFunction from 'lodash/lang/isFunction';
import isObject from 'lodash/lang/isObject';
import assign from 'lodash/object/assign';

/**
 * Turn a normal function into an action. Can be used as a decorator on class
 * methods as well.
 * @param {Function} handler Function to turn into an action.
 * @param {String} name Decorated method name.
 * @param {Object} descriptor Descorated method descriptor.
 * @returns {Object} Resultant action - a function/stream hybrid.
 */
export default function wrap(handler, name, descriptor) {
	if (isFunction(handler)) {
		// This is kind of an unusual pattern, but necessary for `most`. When
		// someone is observing the action, then `add` will be a valid function
		// that writes to the action stream; when no one is observing then `add`
		// will be null.
		let add = null, stream = null;
		const results = create((a) => {
			add = a;
			stream.active = true;
			return () => {
				add = null;
				stream.active = false;
			};
		});

		// Create a function that acts like a `most` stream but is callable.
		stream = assign(function action() {
			const result = handler.apply(null, arguments);
			// The result is only added to the event stream if someone is
			// actually listening for events.
			if (add) {
				add(result);
			}
			return result;
		}, { source: results.source });

		stream.active = false;

		return stream;
	} else if (isObject(handler)) {
		descriptor.value = wrap(descriptor.value);
		return descriptor;
	} else {
		throw new TypeError('Can only wrap functions.');
	}
}
