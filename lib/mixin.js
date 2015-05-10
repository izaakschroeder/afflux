
import { Component } from 'react';
import { combine, between } from 'most';

/**
 * Create a higher-order component from the given component that listens and
 * reacts to updates from some event sources.
 *
 * Use as an ES7 mixin:
 *
 * @observe([streamA, streamB, ...], (a, b) => {
 *   foo: a.foo,
 *   bar: b.bar
 * })
 *
 * When any of `streamA`, `streamB`, etc. updates, then the state properties
 * `foo` and `bar` get updated and passed down as properties to the wrapped
 * component.
 *
 * You may also pass strings instead of stream objects; the current value of
 * the given prop will be used as the stream.
 *
 * See: https://medium.com/@dan_abramov/94a0d2f9e750
 *
 */
export default function observe(observables, state) {
	// Create a combined stream that maps all the observables to a single state
	// value for the react component.
	const stream = combine(state, observables);

	// Create the higher-order component.
	return function wrap(Target) {

		return class ObservedComponent extends Component {

			constructor() {
				property
					.until(this.unmounted)
					.observe(result => this.setState(result));
			}

			getInitialState() {
				return property.value;
			}

			componentWillUnmount() {
				unmount.emit();
			}

			render() {
				return <Target {...this.props} {...this.state}/>;
			}
		};
	};
}
