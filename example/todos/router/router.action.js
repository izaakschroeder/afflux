
import { action } from 'afflux';
import Promise from 'bluebird';

// https://github.com/yahoo/fluxible-router/blob/master/lib/navigateAction.js
// Note that we can get away with very little here - there is no need to have
// separate success and failure events - they are handled by the streams
// themselves; you can also simply just check the result of the promise.

export default function createActions() {
	return {
		navigate: action(function navigate(url) {
			const route = routeFor(url);
			if (!route) {
				return Promise.reject();
			}
			return route.run();
		}),
		set: action(function(route) {

		})
	}
}
