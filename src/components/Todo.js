import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { TextField, Card, Layout } from 'preact-mdl';

import bindActions from '../util';
import reducers from '../reducers';
import { addTodo, removeTodo } from '../actions/todo';
import TodoItem from './TodoItem';

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

	render({ todos }, { text }) {
		return (
			<Card shadow={2}>
				<form onSubmit={this.addTodos}>
					<TextField
						floating-label
						value={text}
						onInput={e => this.setState({ text: e.target.value })}
						label='What must be done?'
					/>
				</form>
				<ul>
					{ todos.map(todo => (
						<TodoItem key={todo.id} todo={todo} onRemove={this.removeTodo} />
					)) }
				</ul>
			</Card>
		);
	}
}
