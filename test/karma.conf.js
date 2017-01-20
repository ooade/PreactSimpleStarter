require('babel-register');
const webpack = require('../webpack.config.babel.js');
const path = require('path');

// Hack for commonsChunkPlugin
const commonsChunkPluginIndex = webpack.plugins.findIndex(plugin => plugin.chunkNames);
webpack.plugins.splice(commonsChunkPluginIndex, 1);

webpack.module.rules.push(
	{
		test: /\.js$/,
    exclude: [
        path.resolve('node_modules/')
    ],
    loader: 'babel-loader'
	},
	{
		test: /\.js?$/,
		loader: 'isparta-loader',
		include: path.resolve(__dirname, '../src')
	}
);

module.exports = function(config) {
	config.set({
		basePath: '../',
		frameworks: ['mocha', 'chai-sinon'],
		reporters: ['mocha', 'coverage'],
		coverageReporter: {
			reporters: [
				{
					type: 'text-summary'
				},
				{
					type: 'html',
					dir: 'coverage',
					subdir: '.'
				}
			]
		},

		browsers: ['PhantomJS'],

		files: [
			'test/components/**/*.js'
		],

		preprocessors: {
			'test/**/*.js': ['webpack'],
			'src/**/*.js': ['webpack'],
			'**/*.js': ['sourcemap']
		},

		webpack,
		webpackMiddleware: { noInfo: true }
	});
};
