import Profile from './Profile';

module.exports = {
	path: 'me',
	getComponent(nextState, cb) {
		require.ensure([], require => {
			cb(null, Profile);
		});
	}
};
