
function property(observable) {
	var prop = { value: undefined };
	observable.observe(function(value) {
		prop.value = value;
	});
	return prop;
}
