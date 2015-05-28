/** @jsx createElement */

import render from '../../lib/render';
import { repeat, of as just, empty } from 'most';
import { Component, createElement } from 'react';

class Foo extends Component {
	render() {
		return <div>Test</div>;
	}
}

describe('#render', () => {
	it('should output a rendered component', () => {
		const component = <Foo/>;
		const stream = empty();
		return expect(render(component, stream))
			.to.eventually.contain('<div>Test</div>');
	});

	it.skip('should re-render if an action is triggered', () => {
		const component = <Foo/>;
		const stream = just();
		return expect(render(component, stream))
			.to.eventually.contain('<div>');
	});

	it.skip('should wait for the results of any promise', () => {
		const component = <Foo/>;
		const stream = just(Promise.resolve());
		return expect(render(component, stream))
			.to.eventually.contain('<div>');
	});

	it.skip('should respect the render limit', () => {
		const stream = repeat();
		const component = <Foo/>;
		return expect(render(component, stream))
			.to.eventually.contain('<div>');
	});
});
