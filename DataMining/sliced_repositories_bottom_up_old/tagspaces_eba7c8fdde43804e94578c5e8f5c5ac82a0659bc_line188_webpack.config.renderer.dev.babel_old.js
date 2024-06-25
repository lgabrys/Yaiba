N
o
 
l
i
n
e
s
import merge from 'webpack-merge';
import baseConfig from './webpack.config.base';
export default merge.smart(baseConfig, {
  module: {
    rules: [
      {
        test: /\.global\.css$/,
        use: [
        ]
      },
      {
        test: /^((?!\.global).)*\.css$/,
        use: [
        ]
      },
      {
        test: /\.global\.(scss|sass)$/,
        use: [
        ]
      },
      {
        test: /^((?!\.global).)*\.(scss|sass)$/,
        use: [
        ]
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: {
        }
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: {
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: {
        }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
        }
      },
      {
        test: /\.(txt)$/,
        use: 'raw-loader'
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/,
      }
    ]
  },
});
