import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import { Router } from 'react-router';

// Load offline plugin only on production
process.env.NODE_ENV === 'production' && require('./offline');

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
