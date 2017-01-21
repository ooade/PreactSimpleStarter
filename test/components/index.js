import { h, render } from 'preact';
import { Provider } from 'preact-redux';

import {} from '../../src';
import App from '../../src/components/App';
import Todo from '../../src/components/Todo';
import TodoItem from '../../src/components/TodoItem';
import ErrorPage from '../../src/components/404';

import store from '../../src/store';

/*global sinon, expect*/
function connect(WrappedComponent, ...props) {
	return (
		<Provider store={store}>
			<WrappedComponent {...props}/>
		</Provider>
	);
};

describe('Test', () => {
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

	describe('404 page', () => {
		it('should render a page with 404', () => {
			render(<ErrorPage />, node);
			expect(node.innerText).to.include('404');
		});
	});

	describe('App', () => {
		it('should render our todo component', () => {
			render(connect(App), node);
			const TodoComponent = render(connect(Todo), node.cloneNode());

			/* Just make sure they have the same text, mdl gives ids to input[type:text]*/
			expect(node.innerText).to.contain(TodoComponent.innerText);
		});

		it('should render a footer', () => {
			render(connect(App), node);
			expect(node.innerHTML).to.contain('<footer>');
		});

		it('should contain a link to about page', () => {
			render(connect(App), node);
			expect(node.innerHTML).to.match(/a.*href.*about/);
		});
	});

	describe('Todo', () => {
		it('contains a form', () => {
			render(connect(Todo), node);
			expect(node.innerHTML).to.contain('<form>');
		});

		it('form has an input text field', () => {
			render(connect(Todo), node);
			expect(node.innerHTML).to.match(/\<input.*type.*text.*\>/);
		});

		it('renders todo item', () => {
			render(connect(Todo), node);
			render(<TodoItem todo={todo}/>, node);

			expect(node.innerHTML).to.contain(todo.text);
		});
	});
});
