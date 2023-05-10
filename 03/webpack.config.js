import { join } from 'path';
import { fileURLToPath } from 'url';

/**
 * @type {import('webpack').Configuration}
 */
export const configuration = {
  entry: {
    'index-cluster-v1': './src/index-cluster-v1.ts',
    'index-cluster-v2': './src/index-cluster-v2.ts',
    'index-server': './src/index-server.ts',
  },
  experiments: {
    outputModule: true,
  },
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'ts-loader',
        test: /\.ts$/,
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: join(fileURLToPath(new URL('./', import.meta.url)), './dist'),
  },
  resolve: {
    extensionAlias: {
      '.js': ['.js', '.ts'],
    },
    extensions: ['.ts'],
  },
  target: 'node18',
};

export default configuration;
