import { bindActionCreators } from 'redux';

export default function bindActions(actions) {
	return dispatch => ({
		...bindActionCreators(actions, dispatch)
	});
}
