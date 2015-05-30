/** @jsx createElement */

import render from '../../lib/render';
import { repeat, create, empty, take } from 'most';
import { Component, createElement } from 'react';
import Promise from 'bluebird';

class Foo extends Component {
	render() {
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

	it('should re-render if an action is triggered', () => {
		const component = <Foo/>;
		const stream = just('x');
		return expect(render(component, stream))
			.to.eventually.contain('Test');
	});

	it('should wait for the results of any promise', () => {
		const component = <Foo/>;
		const stream = just(Promise.resolve('x'));
		return expect(render(component, stream))
			.to.eventually.contain('Test');
	});

	it.skip('should respect the render limit', () => {
		const stream = repeat();
		const component = <Foo/>;
		return expect(render(component, stream))
			.to.eventually.contain('<div>');
	});
});
