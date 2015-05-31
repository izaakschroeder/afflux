/** @jsx createElement */

import render from '../../lib/render';
import { create, empty, take, await } from 'most';
import { Component, createElement } from 'react';
import { once } from 'lodash';
import Promise from 'bluebird';

function publisher() {
	const s = create((add) => s.add = add, () => s.add = null);
	return s;
}

class Foo extends Component {

	render() {
		if (this.props.invoke) {
			this.props.invoke();
		}
		return <div>{this.props.state.value}</div>;
	}
}

describe('#render', () => {
	it('should output a rendered component', () => {
		return expect(render(<Foo state={{value: 'foo'}}/>, empty()))
			.to.eventually.contain('foo');
	});

	it('should re-render if an action is triggered', () => {
		const stream = publisher();
		const state = { };
		const component = <Foo state={state} invoke={once(() => {
			stream.add('foo');
		})}/>;
		take(1, stream).observe((value) => state.value = value);
		return expect(render(component, stream))
			.to.eventually.contain('foo');
	});

	it('should wait for the results of any promise', () => {
		const stream = publisher();
		const state = { };
		const component = <Foo state={state} invoke={once(() => {
			stream.add(Promise.resolve('foo'));
		})}/>;
		take(1, await(stream)).observe((value) => state.value = value);
		return expect(render(component, stream))
			.to.eventually.contain('foo');
	});

	it('should respect the render limit', () => {
		const stream = publisher();
		const state = { };
		let i = 0;
		const component = <Foo state={state} invoke={() => {
			stream.add(i++);
		}}/>;
		take(9, stream).observe((value) => state.value = value);
		return expect(render(component, stream))
			.to.eventually.contain('9');
	});

	it('should reject on error', () => {
		const state = {};
		const component = <Foo state={state} invoke={() => {
			throw 'foo';
		}}/>;
		return expect(render(component, empty())).to.be.rejectedWith('foo');
	});
});
