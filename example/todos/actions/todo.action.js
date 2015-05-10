
import { action } from 'afflux';
import Promise from 'bluebird';
import { Record } from 'immutable';

var Todo = Record({ id: 0, complete: false, text: '' });

function create(props) {
	props.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
	return Todo(props);
}

export default {
	list: action(() => {
		return Promise.resolve([
			Todo({}),
			Todo({})
		]);
	}),
	get: action((id) => {
		return Promise.resolve(Todo({}));
	}),
	create: action((props) => {
		return Promise.resolve(create(props));
	}),
	destroy: action((id) => {
		return Promise.resolve(id);
	}),
	update: action((props) => {
		return Promise.resolve(Todo(props));
	})
};
