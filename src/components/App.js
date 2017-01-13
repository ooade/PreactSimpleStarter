import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { TextField, Card, Layout } from 'preact-mdl';
import { Link } from 'react-router';

import bindActions from '../util';
import reducers from '../reducers';
import { addTodo, removeTodo } from '../actions/todo';
import TodoItem from './todo-item';

@connect(reducers, bindActions({ addTodo, removeTodo }))
export default class App extends Component {
	addTodos = e => {
		e.preventDefault();

		let { text } = this.state;
		this.setState({ text: '' });
		this.props.addTodo(text);
	};

	removeTodo = (todo) => {
		this.props.removeTodo(todo);
	};

	render({ todos, children }, { text }) {
		return (
			<Card shadow={2}>
				<form onSubmit={this.addTodos}>
					<TextField
						floating-label
						value={text}
						onInput={this.linkState('text')}
						label='What must be done?'
					/>
				</form>
				<ul>
					{ todos.map(todo => (
						<TodoItem key={todo.id} todo={todo} onRemove={this.removeTodo} />
					)) }
				</ul>
				<p>
				<Link to='/me'> Developed by? </Link>
				</p>
				{ children }
			</Card>
		);
	}
}
