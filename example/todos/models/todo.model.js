
import { Record } from 'immutable';

export default class Todo extends Record({
	id: 0,
	complete: false,
	text: 'Hello World'
}) {
	get isAdmin() {
		return this.id > 5;
	}
}
