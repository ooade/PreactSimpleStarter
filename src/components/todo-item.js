import { h, Component } from 'preact';
import { Button } from 'preact-mdl';

export default class TodoItem extends Component {
	shouldComponentUpdate({ todo, onRemove }) {
		return todo !== this.props.todo || onRemove !== this.props.onRemove;
	}

	remove = () => {
		let { onRemove: remove, todo } = this.props;
		remove(todo);
	};

	render({ todo }) {
		return (
			<li>
				<Button colored fab raised onClick={this.remove}>&times;</Button>
				{ ' ' + todo.text }
			</li>
		);
	}
}
