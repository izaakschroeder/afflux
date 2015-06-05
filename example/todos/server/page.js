/** @jsx createElement */

import _ from 'lodash';
import { Component, createElement } from 'react';
import escape from 'script-escape';

export default class Page extends Component {

	render() {

		const {
			markup,
			scripts,
			styles,
			title,
			state
		} = this.props;

		// Create a serialized version of the state so that the client can
		// restore it.
		const serialized = escape(JSON.stringify(state));

		return <html>
			<head>
				<title>{title}</title>

				{_.map(styles, (href, i) => {
					return <link rel='stylesheet' href={href} key={i}/>;
				})}
			</head>
			<body>
				<div id='content' dangerouslySetInnerHTML={{
					__html: markup || ''
				}}/>
				<script type='text/javascript' dangerouslySetInnerHTML={{
					__html: 'window.__state__ = ' + serialized + ';'
				}}/>
				{_.map(scripts, (src, i) => {
					return <script type='text/javascript' src={src} key={i}/>;
				})}
			</body>
		</html>;
	}
}
