
import { Component, render } from 'react';
import { mixin } from 'afflux';

@observes([todos.x, users.y], (todos, user) => { todos: todos, user: user })
export default class App extends Component {
	constructor() {

	}

	render() {
		<Todos todos={this.props.todos}/>
	}
}

const root = document.querySelector('#content');

// State from the server
var state = {
	todos: { 4: { text: 'Sample todo' } }
};

// Actions
var actions = {
	todos: todosActions()
}

// Stores
var stores = {
	todos: todosStore(state.todos, actions.todos)
}

render(<App actions={actions} stores={stores}/>, root);
