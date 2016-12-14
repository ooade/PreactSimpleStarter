import { h, render } from 'preact';
import { Provider } from 'preact-redux';

import 'material-design-lite/material';

import store from './store';
import App from './components/app';
import './style';

render(
	<Provider store={store}>
		<App />
	</Provider>, document.body);
