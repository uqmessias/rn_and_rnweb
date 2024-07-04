import {build} from 'esbuild';
import devServer from 'esbuild-dev-server';
import open from 'open';

const buildPromise = build({
  entryPoints: ['index.js'],
  bundle: true,
  outfile: './dist/js/bundle.web.js',
  alias: {
    'react-native': 'react-native-web',
  },
  loader: {
    '.js': 'tsx',
  },
});

const port = '8080';

devServer.start(buildPromise, {
  index: 'web/index.html',
  port,
  watchDir: 'src',
  staticDir: 'dist',
});

open(`http://localhost:${port}`);
