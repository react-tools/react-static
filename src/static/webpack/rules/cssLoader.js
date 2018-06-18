import autoprefixer from 'autoprefixer'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes'


function initCSSLoader (stage) {
  const cssLoader = [
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        minimize: stage === 'prod',
        sourceMap: false,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebookincubator/create-react-app/issues/2677
        sourceMap: true,
        ident: 'postcss',
        plugins: () => [
          postcssFlexbugsFixes,
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
          }),
        ],
      },
    },
  ]
  return cssLoader
}

export default function ({ stage, isNode }) {
  let cssLoader = initCSSLoader(stage)
  if (stage === 'node' || isNode) {
    return {
      test: /\.css$/,
      loader: cssLoader,
    }
  }
  if (stage === 'dev') {
    cssLoader = ['style-loader'].concat(cssLoader)
  } else {
    cssLoader = [MiniCssExtractPlugin.loader].concat(cssLoader)
  }

  return {
    test: /\.css$/,
    loader: cssLoader,
  }
}
