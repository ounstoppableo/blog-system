import * as path from 'path';
import * as webpack from 'webpack';

export default {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
      }
    }
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require('./dll/vendor-manifest.json'),
      context: path.resolve(__dirname, '.'),
    })
  ],
} as webpack.Configuration;

