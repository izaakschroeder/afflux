if (window && window.history && window.history.pushState) {
	//
	// window.removeEventListener('popstate', listener)
	function listener(state) {
		router.navigate(state.url);
	}

	window.addEventListener('popstate', listener);

	router.url.observe(function() {
		// Also replaceState
		window.history.pushState(state, title, url);
	});
}
