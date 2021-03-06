/** @jsx createElement */

import { Component, render, createElement, PropTypes } from 'react';
import { render as renderToString } from 'afflux';
import { send, receive } from 'react-beam';
import observer from 'react-observer';
import { observe } from 'most';

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
		const items = this.props.todos || this.props.stores.todos.value;
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
			<Todos/>
			<a onClick={this.props.actions.todos.create}>Create Todo</a>
		</div>;
	}
}

/*

On the client typically there is an eternal watcher - observe store values and
save them for when new components are instantiated; also allows one to get the
state of the system at any time.

On the server the watcher lives only for the request.

"state" stream -> merge(stores)

on server, combine this with render stream

sample((state, html) => { return { state: state, html: html }; }, render, state, render);

 */


// State from the server
var state = {
	todos: { 4: { id: 4, text: 'Sample todo' } }
};

// Actions
var TodoActions = require('../actions/todo.action');
var todosStore = require('../stores/todo.store');

var todoActions = new TodoActions();

import { has, pick } from 'lodash';

const derp = pick(todoActions, (value) => has(value, 'source'));

const actionList = derp;

var actions = {
	todos: todoActions
};

// Stores
var stores = {
	todos: todosStore(actions.todos, state.todos)
};



console.log('actions', actions);
console.log('stores', stores);

actions.todos.create.observe(function(x) {
	console.log('someone make a todo lel');
})

observe(function(todos) {
	console.log('current todos', todos);
}, stores.todos);


import escape from 'script-escape';

console.log(escape(JSON.stringify({ foo: '</script>' }))) ;

function go() {
	const root = document.querySelector('#content');
	const app = <App actions={actions} stores={stores}/>;

	renderToString(app).then(function(result) {
		console.log('rendered!', result);
	});
	//render(app, root);
}

go();
