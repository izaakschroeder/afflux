# afflux-router

Lean routing for [afflux].

Features:
 * Transition hooks
 * Lazy route loading
 * Express-compatible routing patterns
 * Server side rendering

```javascript
import { Route } from 'afflux-router';
import { render } from 'react';

const root = document.getElementById('#content');

@root
class App extends Component {
	render() {
		return <Route path='/' handler={Layout}>
			<Route path='/foo' handler={Foo}/>
		</Route>;
	}
}

render(<App stores={stores} actions={actions}/>, root);

```

[afflux]: https://github.com/izaakschroeder/afflux
[react-router]: https://github.com/rackt/react-router
[fluxible-router]: https://github.com/yahoo/fluxible-router
[react-router-component]: https://github.com/STRML/react-router-component
