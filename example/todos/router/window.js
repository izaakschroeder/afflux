if (window && window.history && window.history.pushState) {
	// window.addEventListener('popstate', listener);
	// window.removeEventListener('popstate', listener)
	router.url.observe(function() {
		// Also replaceState
		window.history.pushState(state, title, url);
	});
}
