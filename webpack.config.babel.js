import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import OfflinePlugin from 'offline-plugin';
import autoprefixer from 'autoprefixer';
import Dashboard from 'webpack-dashboard/plugin';

const ENV = process.env.NODE_ENV || 'development';

let config = {
	entry: {
		app: './src/index.js',
		vendor: ['preact', 'react-router' , 'redux', 'preact-mdl']
	},

	output: {
		path: path.resolve(__dirname, './build'),
		filename: '[name].[hash:8].js',
		chunkFilename: '[id].[hash:8].chunk.js'
	},

	resolve: {
		extensions: ['.js', '.scss'],
		alias: {
			components: path.resolve(__dirname, 'src/components'),    // used for tests
			'react': 'preact-compat',
			'react-dom': 'preact-compat'
		}
	},

	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'source-map-loader',
				exclude: /src/
			},
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'eslint-loader',
				include: /src/
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [
					path.resolve('src'),
					path.resolve('node_modules/preact-compat/src')
				]
			},
			{
				test: /\.(scss|css)$/,
				loader: ExtractTextPlugin.extract('css-loader?sourceMap!postcss-loader!sass-loader?sourceMap')
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.(xml|txt)$/,
				loader: 'raw-loader'
			},
			{
				test: /\.(svg|woff|ttf|eot)(\?.*)?$/i,
				loader: 'file-loader?name=assets/fonts/[name]_[hash:base64:5].[ext]'
			}
		]
	},

	plugins: ([
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity
		 }),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.LoaderOptionsPlugin({
			options: {
				context: __dirname,
				postcss: [autoprefixer]
			},
			minimize: true,
			debug: false
		}),
		new ExtractTextPlugin({
			filename: '[name].[chunkhash:5].css'
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(ENV)
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			title: 'Preact Simple Starter',
		 	removeRedundantAttributes: true,
			inject: false,
			manifest: `${ENV === 'production' ? 'manifest.json' : '/assets/manifest.json' }`,
			minify: {
				collapseWhitespace: true,
				removeComments: true
			},
			themeColor: '#333'
		}),
		new ManifestPlugin({
			fileName: 'asset-manifest.json'
		})
	])
	// Only for development
	.concat(ENV === 'development' ? [
		new webpack.HotModuleReplacementPlugin(),
		new Dashboard()
	] : [])
	// Only for production
	.concat(ENV === 'production' ? [
		new webpack.NoEmitOnErrorsPlugin(),
		new CopyWebpackPlugin([
			{ from: './src/assets/manifest.json', to: './' },
			{ from: './src/assets/img', to: './img' }
		]),
		new OfflinePlugin({
			relativePaths: false,
			publicPath: '/',
			updateStrategy: 'all',
			preferOnline: true,
			safeToUseOptionalCaches: true,
			caches: 'all',
			version: 'PreactSSv[hash]',
			ServiceWorker: {
				navigateFallbackURL: '/',
				events: true
			},
			AppCache: false
		}),
		new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: 0
			},
			compress: {
				unused: 1,
				warnings: 0
			}
		}),
		// CompressionPlugin Usage in Express
		/**
			app.get('*.js', function (req, res, next) {
				req.url = req.url + '.gz';
				res.set('Content-Encoding', 'gzip');
				next();
			});
		**/
		new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
	] : []),

	stats: { colors: true },

	devtool: ENV !== 'production' && 'eval',
	devServer: {
		port: process.env.PORT || 8080,
		host: '0.0.0.0',
		compress: true,
		contentBase: './src',
		historyApiFallback: true
	}
};

const commonsChunkPluginIndex = config.plugins.findIndex(plugin => plugin.chunkNames);

config.plugins.splice(commonsChunkPluginIndex, 1);

module.exports = config;
