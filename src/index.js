import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import { Router } from 'react-router';

import 'material-design-lite/material';

import App from './components/App';

import store, { history } from './store';
import './style';

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
