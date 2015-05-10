
import most from 'most';

export default function action(handler) {

	let listener;

	let requests = most.stream(add => {
		listener = add;
	});

	let action = () => {
		const result = most.fromPromise(handler.apply(null, arguments));

	};
	action.observable = requests.join();
	return action;
}
