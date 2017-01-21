import { h } from 'preact';
import { Button } from 'preact-mdl';

export default({ todo, onRemove }) => {
	const remove = () => {
		onRemove(todo);
	};

	return (
		<li>
			<Button colored fab raised onClick={remove}>&times;</Button>
			{ ' ' + todo.text }
		</li>
	);
};
