/** @jsx createElement */

import { render } from 'afflux';
import { renderToStaticMarkup, createElement } from 'react';

import Page from './page';
import assets from './assets';
import actions from '../actions';

import App from '../views/app';

export default function renderPage(req, res, next) {

	const dispatcher = actions();
	const state = { };
	// const state = stores();

	render(<App/>, dispatcher).then(markup => {
		return renderToStaticMarkup(<Page
			markup={markup}
			title={state.title}
			state={state}
			styles={assets.styles}
			scripts={assets.scripts}
		/>);
	}).then(content => {
		// TODO Extract status code from router? or something
		res.status(200).send(content);
	}, next);
}
