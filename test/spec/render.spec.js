/** @jsx createElement */

import render from '../../lib/render';
import { repeat, create, empty, take } from 'most';
import { Component, createElement } from 'react';
import { once } from 'lodash';
import Promise from 'bluebird';

function publisher() {
	var s = create((add) => s.add = add, () => s.add = null);
	return s;
}

class Foo extends Component {

	render() {
		if (this.props.invoke) {
			this.props.invoke();
		}
		return <div>Test</div>;
	}
}

function just(e) {
	return take(1, create((add) => add(e)));
}

describe('#render', () => {
	it('should output a rendered component', () => {
		return expect(render(<Foo/>, empty()))
			.to.eventually.contain('Test');
	});

	// This is now an infinite loop
	it('should re-render if an action is triggered', () => {
		const stream = publisher();
		const component = <Foo invoke={once(() => {
			stream.add('x');
		})}/>;
		return expect(render(component, stream))
			.to.eventually.contain('Test');
	});

	it('should wait for the results of any promise', () => {
		const component = <Foo/>;
		const stream = publisher();
		return expect(render(component, stream))
			.to.eventually.contain('Test');
	});

	it.skip('should respect the render limit', () => {
		const stream = publisher();
		const component = <Foo/>;
		return expect(render(component, stream))
			.to.eventually.contain('<div>');
	});
});
