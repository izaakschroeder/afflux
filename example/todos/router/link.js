
import { Component } from 'react';

export default class Link extends Component {

	get isActive() {
		return this.context.router === this.route;
	}

	get route() {
		return this.context.router.match(this.props.href);
	}

	onClick(ev) {
		ev.preventDefault();
		this.context.router.navigate(this.route);
	}

	render() {
		return <a onClick={this.onClick} {...this.props}>
			{this.props.children}
		</a>;
	}
}
