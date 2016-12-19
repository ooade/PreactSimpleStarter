import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import OfflinePlugin from 'offline-plugin';
import autoprefixer from 'autoprefixer';

const ENV = process.env.NODE_ENV || 'development';

module.exports = {
	entry: './src/index.js',

	output: {
		path: path.resolve(__dirname, './build'),
		filename: 'bundle.[hash:8].js',
		chunkFilename: '[name].[chunkhash].chunk.js'
	},

	resolve: {
		extensions: ['.js', '.json', '.scss'],
		alias: {
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
		new webpack.LoaderOptionsPlugin({
			options: {
				context: __dirname,
				postcss: [autoprefixer]
			}
		}),
		new ExtractTextPlugin({
			filename: '[name].[chunkhash:5].css',
			allChunks: false
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
	]).concat(ENV === 'production' ? [
		new webpack.NoErrorsPlugin(),
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
		})
	] : []),

	stats: { colors: true },

	devtool: ENV === 'production' ? 'source-map' : 'inline-source-map',
	devServer: {
		port: process.env.PORT || 8080,
		host: '0.0.0.0',
		compress: true,
		contentBase: './src',
		historyApiFallback: true
	}
};
