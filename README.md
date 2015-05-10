# afflux

Functional-reactive flux patterns for React.


afflux uses [most] to implement a very minimal, fast, functional-reactive style of [flux] patterns for web applications.

Actions:
 * Are observables - you can observe everything that results from invocation
 * Create promises - you can wait for the result of a single action

Stores:
 * Create properties - Map actions to properties that get consumed by views
 * Domain specific - Encapsulate functionality specific to one area


```javascript

var example = action((id) => {
	return ajax().then(resp => JSON.parse(resp));
});

// Output result of fetching action
example(5).then(console.log);

// Watch all results that are fetched
example.values.observe(console.log)

// Watch all the errors that occur
example.errors.observe(console.error)
```




[most]: https://github.com/cujojs/most
[kefir]: http://pozadi.github.io/kefir
[rxjs]: ...
[bacon]: ...
[fluxxor]: ...
[fluxible]: ...
https://medium.com/@garychambers108/functional-reactive-react-js-b04a8d97a540
