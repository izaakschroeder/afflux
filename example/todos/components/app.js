/** @jsx createElement */

import { Component, render, createElement, PropTypes } from 'react';
import { container, observe } from 'afflux';
import map from 'lodash/collection/map';

@observe(stores => [ stores.todos ], todos => {
	return { todos: todos };
})
class Todos extends Component {
	render() {
		console.log('renderino!');
		var todos = map(this.props.todos, todo => <div>
			{todo.id} - {todo.text}<br/>
		</div>);
		return <div>
			{todos}
		</div>;
	}
}

@container
class App extends Component {
	render() {
		return <Todos/>;
	}
}



// State from the server
var state = {
	todos: { 4: { text: 'Sample todo' } }
};

// Actions
var TodoActions = require('../actions/todo.action');
var todosStore = require('../stores/todo.store');

var actions = {
	todos: new TodoActions()
};

// Stores
var stores = {
	todos: todosStore(actions.todos, state.todos)
};

// const state = mapValues(stores, (store) => store.dehydrate());


/*
const routes = <Route path='/' handler={App}>
	<Route path='/about' handler={About}/>
	<Route path='/user' handler={Users}>
		<Route path='/:id' handler={User}/>
	</Route>
</Route>;
*/

console.log('actions', actions);
console.log('stores', stores);

stores.todos.observe(function(todos) {
	console.log('current todos', todos);
});


actions.todos.create();
actions.todos.create();

function go() {
	const root = document.querySelector('#content');
	const app = <App actions={actions} stores={stores}/>;
	render(app, root);
}

go();


actions.todos.create();
actions.todos.create();
actions.todos.create();
actions.todos.create();
