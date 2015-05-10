import { Map } from 'immutable';


function collection(actions) {
	return actions.merge().scan((prev, fn) => fn(prev), Map());
}

export default function (actions) {
	var todos = collection([
        actions.create
            .map((todo) => this.set(todo.id, todo)),
        actions.destroy
            .map((todo) => this.delete(todo.id)),
        actions.update
            .map((todo) => this.set(todo.id, todo))
    ]);

	return {
        getAll: todos
    };
}
