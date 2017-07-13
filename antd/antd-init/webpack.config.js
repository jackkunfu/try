// Learn more on how to config.
// - https://github.com/ant-tool/atool-build#配置扩展
var HtmlWebpackPlugin = require('html-webpack-plugin');

// var webpackConfig = {
module.exports = {
	entry: './index.js',
	output: {
		path: './build',
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.json$/,
				loader: "json"
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'react-loader!babel'
			},
			{
				test: /\.css$/,
				loader: 'style!css?modules!postcss'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
		  template: "index.html"
		})
	]
}

// module.exports = (function(webpackConfig) {
//   webpackConfig.babel.plugins.push('transform-runtime');
//   webpackConfig.babel.plugins.push(['import', {
//     libraryName: 'antd',
//     style: 'css',
//   }]);

//   return webpackConfig;
// })()
