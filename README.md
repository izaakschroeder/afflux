# afflux

Functional-reactive flux patterns for React.

afflux uses [most] to implement a very minimal, fast, functional-reactive style of [flux] patterns for web applications.

[Actions]:
 * Are asynchronous - Actions always flow on the next tick.
 * Are streams of promises - You can observe the flow of all actions.
 * Are promises - You can observe for the result of a single action.

[Stores]:
 * Are synchronous - React only to results of actions.
 * Create properties - Reduce actions to get consumed by views.
 * Domain specific - Encapsulate functionality specific to one domain.

What about the dispatcher? There is none. Everything is a stream. You can emulate all the functionality of a dispatcher with stream combinators.

## Framework Comparison

TODO.

## Usage

```json
npm install --save afflux react
```

### Actions

Actions are just functions that create promises. Typically you group your actions together logically in a class that encapsulates the relevant functionality. Actions contain no data about the _state_ of the system.

```javascript
import Promise from 'bluebird';
import { action } from 'afflux';

class MyActions {
    constructor(api) {
        this.api = api;
    }

    @action
    foo() {
        return this.api.get('/foo');
    }

    @action
    bar() {
        return Promise.reject();
    }
}
```

You can create free-standing functions if you wish as well.

```javascript
import { action } from 'afflux';

var example = action((id) => {
	return ajax().then(resp => JSON.parse(resp));
});
```

### Stores

Stores react precisely to the results of actions. Stores _do_ contain the state of the system.

Typically you want:
 * to produce a result that is the combination of multiple actions,
 * to use the result of the promise from the action.

```javascript
class MyStore {
    constructor(actions) {
        this.foo = actions.bar.await();
    }
}
```

### Views

```javascript
import { component, observe } from 'afflux';

@component
class App extends Component {

}

@observe
class View extends Component {

}
```

### Server-Side Rendering

Server-side rendering is possible by waiting until all actions have settled and then outputting the result. Clients can then use this result by having the stores dehydrate their state on the server and rehydrate them on the client.

Every request creates new instances of actions and stores so messages and state from one request don't interfere with those of another.

```javascript
import { render } from 'afflux';
import express from 'express';

let app = express();

app.use((req, res) => {
    let component = <App stores={stores} actions={actions}/>;

    render(component).then(result => {
        res.send(result);
    });
});
```

## Testing

Easy to test using any test framework that supports promises such as [mocha].

Actions:

```javascript
import todos from 'actions/todos.action';
describe('#create', () => {
    // Stub out any backend services you call out to.
    let actions = todos();
    it('should create a new todo', () => {
        // Since actions return promises, we can just test the value of
        // the promise directly.
        return expect(actions.create).to.eventually.equal({ foo: 'bar' });
    });
});
```

Stores:

```javascript
import emitter from 'most/sources/emitter';
import never from 'most/sources/never';
import todos from 'stores/todos.store';

describe('todos', () => {
    // Instead of using normal actions, use emitters for everything you
    // want to control and nevers for anything else. This ensures that
    // the merged values stream eventually ends; it will end after all
    // actions have ended.
    let create = emitter();
    let values = todos({ create: create, update: never });
    it('should add created todo', () => {
        create.emit({ id: 5 }).end();
        // Since stores are also promises, we can just test the value of
        // the promise directly.
        return expect(values).to.eventually.contain({ id: 5 });
    });
})
```




[flux]: http://facebook.github.io/flux/
[most]: https://github.com/cujojs/most
[kefir]: http://pozadi.github.io/kefir
[rxjs]: https://github.com/Reactive-Extensions/RxJS
[bacon]: https://baconjs.github.io/
[fluxxor]: http://fluxxor.com/
[fluxible]: https://github.com/yahoo/fluxible
[biff]: https://github.com/FormidableLabs/biff
[alt]: http://alt.js.org/
[blog post]: https://medium.com/@garychambers108/functional-reactive-react-js-b04a8d97a540
