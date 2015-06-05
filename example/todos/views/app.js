/** @jsx createElement */

import { Component, createElement } from 'react';
import { send, receive } from 'react-beam';
import observer from 'react-observer';

import map from 'lodash/collection/map';


@receive('stores', 'actions')
@observer
class Todos extends Component {

	observe(props) {
		return {
			todos: props.stores.todos
		};
	}

	render() {
		const items = this.props.todos;
		const todos = map(items, todo => <div key={todo.id}>
			{todo.id} - {todo.text}<br/>
		</div>);
		return <div>
			{todos}
		</div>;
	}
}

@send('stores', 'actions')
class App extends Component {
	render() {
		return <div>
			Hello World
		</div>;
	}
}

export default App;
