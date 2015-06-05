/** @jsx createElement */

import { observe } from 'most';
import { render, createElement } from 'react';
import App from '../views/app';

// Import the app state given from the server.
const state = window.__state__;
// Get the root element.
const root = document.querySelector('#content');
// Build the app component.
const component = <App/>;

// When the title changes, update the document title.
// observe(title => document.title = title, stores.title);

// Mount the root component
render(component, root);
