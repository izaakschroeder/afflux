/** @jsx createElement */

import { Component, PropTypes, createElement } from 'react';
import { combine, between } from 'most';

/**
 * Create a higher-order component from the given component that listens and
 * reacts to updates from some event sources.
 *
 * Use as an ES7 mixin:
 *
 * @observe(stores => [stores.a, stores.b], (a, b) => {
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
export default function observe(get, state) {

	// Create the higher-order component.
	return function wrap(Target) {

		return class ObservedComponent extends Component {

			/**
			 * Context we wish to inherit from our parents.
			 * @type {Object}
			 */
			static contextTypes = {
				stores: PropTypes.object,
				actions: PropTypes.object
			}

			constructor(props, context) {
				super(props, context);

				const observables = get(props.stores || context.stores);
				// Create a combined stream that maps all the observables to a
				// single state value for the react component.
				this.property = combine(state, observables);
			}

			componentDidMount() {
				console.log('checking...');
				this.observer = this.property.observe((props) => {
					console.log('setting state...', props);
					this.setState(props);
				});
			}

			componentWillUnmount() {
				if (this.observer) {
					this.observer.cancel();
				}
			}

			render() {
				return <Target {...this.props} {...this.state}/>;
			}
		};
	};
}
