import { map, flatMap, take } from 'most';
import { partial } from 'lodash';

function compute(action, todo) {
    // Do something with both action and todo
    return { ... };
}

const stream = flatMap(
    (result) => map(partial(compute, result), take(1, actions.getPhotos)),
    action
);

class MyActions {

	@action
	login(user) {
		return Promise.resolve(1);
	}

	@action
	getPhotos(user) {
		return Promise.resolve([ user ]);
	}
}

class MyStore {

	constructor(actions) {
		this.user = actions.login;
		this.photos =
	}

}
