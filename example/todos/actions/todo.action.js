
import { action } from 'afflux';
import Promise from 'bluebird';
import { Record } from 'immutable';

class Todo extends Record({ id: 0, complete: false, text: 'Hello World' }) {
	get isAdmin() {
		return this.id > 5;
	}
}

function create(props) {
	props = props || { };
	props.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
	return new Todo(props);
}

export default class TodoActions {

	constructor(store) {
		this.store = store;
	}

	@action
	hydrate(todos) {
		return Promise.resolve(todos);
	}

	@action
	list() {
		return Promise.resolve([
			Todo({}),
			Todo({})
		]);
	}

	@action
	create(props) {
		if (Math.random() > 0) {
			return Promise.resolve(create(props));
		} else {
			return Promise.reject({ err: "WTF?" });
		}
	}

	@action
	destroy(id) {
		return Promise.resolve();
	}

	@action
	update(props) {
		return Promise.resolve(Todo(props));
	}
}
