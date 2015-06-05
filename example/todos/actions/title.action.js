
import { action } from 'afflux';

export default class TitleActions {

	@action
	set(title) {
		return title;
	}
}
