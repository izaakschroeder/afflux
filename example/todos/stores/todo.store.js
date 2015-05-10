import { Map, fromJS } from 'immutable';
import { merge } from 'most';

function collection(base, actions) {
	return merge(actions).scan((prev, fn) => fn(prev), base);
}

export default function (actions, base) {
	return collection(base ? fromJS(base) : Map(), [
        actions.create
            .map((todo) => (todos) => todos.set(todo.id, todo)),
        actions.destroy
            .map((todo) => (todos) => todos.delete(todo.id)),
        actions.update
            .map((todo) => (todos) => todos.set(todo.id, todo))
    ]).map(entry => entry.toJS());
}
