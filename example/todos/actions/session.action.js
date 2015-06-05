
import { action } from 'afflux';

export default class SessionActions {

	constructor(store) {
		this.store = store;
		this.source = merge(
			this.login,
			this.logout
		).source;
	}

	@action
	login(id) {

	}

	@action
	logout() {

	}
}
