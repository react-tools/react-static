import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
import path from 'path'

import rules from './rules'

export default function ({ config }) {
  const { ROOT, DIST, NODE_MODULES, SRC, HTML_TEMPLATE } = config.paths
  const hotPatches = config.noHot
    ? []
    : [
      require.resolve('react-hot-loader/patch'),
      require
        .resolve('react-dev-utils/webpackHotDevClient')
        .require.resolve('webpack/hot/only-dev-server'),
    ]
  return {
    context: path.resolve(__dirname, '../node_modules'),
    entry: [
      ...hotPatches,
      // `${require.resolve('webpack-dev-server/client')}?/`,
      path.resolve(ROOT, config.entry),
    ].filter(v => v),
    output: {
      filename: 'app.[hash:8].js',
      path: DIST,
      publicPath: '/',
    },
    module: {
      rules: rules({ config, stage: 'dev' }),
    },
    resolve: {
      modules: [
        path.resolve(__dirname, '../node_modules'),
        'node_modules',
        NODE_MODULES,
        SRC,
        DIST,
      ],
      extensions: ['.js', '.json', '.jsx'],
    },
    plugins: [
      new webpack.EnvironmentPlugin(process.env),
      new HtmlWebpackPlugin({
        inject: true,
        template: `!!raw-loader!${HTML_TEMPLATE}`,
      }),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'async',
      }),
      !config.noHot && new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.NamedModulesPlugin(),
      new CaseSensitivePathsPlugin(),
    ].filter(v => v),
    devtool: 'eval-source-map',
  }
}
