
import { Component } from 'react';
import { mixin } from 'afflux';

@observes([todos.x, users.y], (todos, user) => { todos: todos, user: user })
export default class App extends Component {
	render() {
		<Todos todos={this.props.todos}/>
	}
}
