import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import { Router } from 'react-router';

require('offline-plugin/runtime').install();

import 'material-design-lite/material';

import App from './components/App';

import store, { history } from './store';

import './style/index.scss';

const routes = {
	childRoutes: [{
		path: '/',
		component: App,
		childRoutes: [
			require('./containers/Profile')
		]
	}]
};


render(
	<Provider store={store}>
		<Router
			history={history}
			routes={routes}
			/>
	</Provider>, document.body);
