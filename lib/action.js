
import most from 'most';
import isFunction from 'lodash/lang/isFunction';

export default function createAction(handler) {

	let errors = most.emitter(),
		results = most.emitter();

	function action() {
		const promise = handler.apply(null, arguments);
		if (!promise || !isFunction(promise.then)) {
			return null;
		} else {
			return promise
				.then(results.emit)
				.catch(errors.emit);
		}
	}

	action.errors = errors;
	action.results = results;

	return action;
}
