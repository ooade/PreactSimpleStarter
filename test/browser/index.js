import { h, render, rerender } from 'preact';
import App from '../../src/components/App';

/*global sinon,expect*/

describe('App', function() {
	let node;

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
});
