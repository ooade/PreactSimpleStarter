import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import { Router, Route } from 'preact-router';

// Load offline plugin only on production
process.env.NODE_ENV === 'production' && require('./offline');

import 'material-design-lite/material';

import App from './components/App';
import ErrorPage from './components/404';

import store from './store';

import './style/index.scss';

render(
	<Provider store={store}>
		<Router>
			<App path='/' />
			<ErrorPage default />
		</Router>
	</Provider>, document.body);
