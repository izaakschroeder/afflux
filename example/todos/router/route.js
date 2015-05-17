
import { Component } from 'react';

class Route extends Component {

	constructor() {
		super();
	}

	render() {
		return this.handler.render();
	}
}
