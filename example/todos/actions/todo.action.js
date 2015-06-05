
import { action } from 'afflux';
import { merge } from 'most';
import Promise from 'bluebird';
import Todo from '../models/todo.model';

function create(props) {
	props = props || { };
	props.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
	return new Todo(props);
}

export default class TodoActions {

	constructor(store) {
		this.store = store;
		this.source = merge(
			this.list,
			this.create,
			this.destroy,
			this.update
		).source;
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
			return Promise.reject({ err: 'wtf' });
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
