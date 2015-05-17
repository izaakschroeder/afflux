/** @jsx createElement */

import { Component, PropTypes, createElement } from 'react';

/**
 * Create an afflux container which passes down stores and actions to all
 * its children. Only your top-level component should be an instance of this.
 * @param  {Function} Wrapped Component to wrap.
 * @return {Function} Wrapped component.
 */
export default function container(Wrapped) {
	return class Container extends Component {

		/**
		 * You must pass both `stores` and `actions` down for your children.
		 * @type {Object}
		 */
		static propTypes = {
			stores: PropTypes.object.isRequired,
			actions: PropTypes.object.isRequired
		}

		/**
		 * Specify the context we're passing down to our children.
		 * @type {Object}
		 */
		static childContextTypes = {
			stores: PropTypes.object,
			actions: PropTypes.object
		}

		/**
		 * Get the context we're passing down to our children.
		 * @returns {Object} Context.
		 */
		getChildContext() {
			return {
				stores: this.props.stores,
				actions: this.props.actions
			};
		}

		/**
		 * Just render whatever's been wrapped.
		 * @returns {Object} Output data.
		 */
		render() {
			return <div>LOL<Wrapped {...this.props}/></div>;
		}

	};
}
