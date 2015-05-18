
import most from 'most';
import isFunction from 'lodash/lang/isFunction';
import isObject from 'lodash/lang/isObject';
import assign from 'lodash/object/assign';
import bindAll from 'lodash/function/bindAll';


/**
 * Turn a normal function into an action. Can be used as a decorator on class
 * methods as well.
 * @param  {[type]} handler Function to turn into an action or decorated class.
 * @param  {String} name Decorated method name.
 * @param  {Object} descriptor Descorated method descriptor.
 * @return {Object} Resultant action - a function/stream hybrid.
 */
export default function wrap(handler, name, descriptor) {
	if (isFunction(handler)) {
		let results = most.emitter();
		return assign(function action() {
			const promise = handler.apply(null, arguments);
			results.emit(promise);
			return promise;
		}, bindAll(results));
	} else if (isObject(handler)) {
		descriptor.value = wrap(descriptor.value);
		return descriptor;
	} else {
		throw new TypeError('Can only wrap functions.');
	}
}