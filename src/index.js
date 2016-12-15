import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import { Router } from 'react-router';

import 'material-design-lite/material';

import App from './components/App';

const routes = {
	childRoutes: [{
		path: '/',
		component: App,
		childRoutes: [
			require('./containers/Profile')
		]
	}]
};

import store, { history } from './store';
import './style';

render(
	<Provider store={store}>
		<Router
			history={history}
			routes={routes}
			/>
	</Provider>, document.body);
