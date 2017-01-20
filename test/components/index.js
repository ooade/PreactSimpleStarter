import { h, render, rerender } from 'preact';
import { Route } from 'react-router';
import { Provider } from 'preact-redux';

import {} from '../../src';
import App from '../../src/components/App';
import store from '../../src/store';

/*global sinon, expect*/
describe('App', function() {
	let node, todo = { text: 'abc' };

	before( () => {
		node = document.createElement('div');
		(document.body || document.documentElement).appendChild(node);
	});

	beforeEach( () => {
		node.innerHTML = '';
	});

	after( () => {
		node.parentNode.removeChild(node);
		node = null;
	});

	it('should render a form', () => {
		render(<Provider store={store}><App /></Provider>, node);

		expect(node.innerHTML).to.contain('<form>');
	});
});
