
import todos from './todo.store';

export default function createStores(actions, initialState) {
	todos(actions.todos, initialState.todos);
}
