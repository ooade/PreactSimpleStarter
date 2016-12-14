import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { TextField, Card } from 'preact-mdl';
import bindActions from '../util';
import reducers from '../reducers';
import { addTodo, removeTodo } from '../actions/todo';
import TodoItem from './todo-item';

@connect(reducers, bindActions({ addTodo, removeTodo }))
export default class App extends Component {
	addTodos = () => {
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
				<form onSubmit={this.addTodos} action="javascript:">
					<TextField floating-label value={text} onInput={this.linkState('text')} label="What must be done?" />
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
