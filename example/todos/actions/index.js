
import { merge } from 'most';
import TodoActions from './todo.action';

export default function create(options) {

	const todos = new TodoActions();

	return {
		source: merge(todos).source,
		todos: todos
	};
}
