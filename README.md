# afflux

Functional-reactive flux patterns for React.


afflux uses [most] to implement a very minimal, fast, functional-reactive style of [flux] patterns for web applications.

Actions:
 * Are observables - you can observe everything that results from invocation
 * Create promises - you can wait for the result of a single action

Stores:
 * Create properties - Map actions to properties that get consumed by views
 * Domain specific - Encapsulate functionality specific to one area



Render app.
It basically defaults to the "loading" state - results from stores haven't come back yet.
Collect all promises that resulted from intial render.
Wait for all promises to resolve (or timeout).
Re-render the app with the same stores/actions - they are now updated with the results from all the promises.
Collect all promises that resulted... repeat.
If no promises remain then output the result.

Considerations - can infinite loop; put sane default clamp to max number of iterations. Are the intermediate results good for anything?



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

```javascript

```


[flux]: http://facebook.github.io/flux/
[most]: https://github.com/cujojs/most
[kefir]: http://pozadi.github.io/kefir
[rxjs]: https://github.com/Reactive-Extensions/RxJS
[bacon]: https://baconjs.github.io/
[fluxxor]: http://fluxxor.com/
[fluxible]: https://github.com/yahoo/fluxible
[blog post]: https://medium.com/@garychambers108/functional-reactive-react-js-b04a8d97a540
