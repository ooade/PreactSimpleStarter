import Profile from './Profile';

module.exports = {
	path: 'profile',
	getComponent(nextState, cb) {
		require.ensure([], require => {
			cb(null, Profile);
		});
	}
};
