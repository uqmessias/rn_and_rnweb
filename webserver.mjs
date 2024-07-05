import esbuild from 'esbuild';
// import devServer from 'esbuild-dev-server';
import open from 'open';
import fs from 'fs';
import dayjs from 'dayjs';

const version = dayjs().valueOf();
const servedir = './dist';

const templateCache = {
  name: 'templateCache',
  setup(build) {
    build.onEnd(() => {
      const index = fs.readFileSync('./web/template.html', {encoding: 'utf-8'});
      const newIndex = index.replaceAll('%%VERSION%%', version);

      if (!fs.existsSync(servedir)) {
        fs.mkdirSync(servedir);
      }

      fs.writeFileSync(`${servedir}/index.html`, newIndex);
    });
  },
};

(async function () {
  const cxt = await esbuild.context({
    entryPoints: ['index.js'],
    bundle: true,
    outfile: `${servedir}/js/bundle.web.${version}.js`,
    alias: {
      'react-native': 'react-native-web',
    },
    loader: {
      '.js': 'tsx',
    },
    plugins: [templateCache],
  });

  // const port = '8080';
  let {port} = await cxt.serve({servedir}).catch(async () => {
    await cxt.dispose();
  });

  open(`http://localhost:${port}`);
})();

/**
 *  https://dev.to/dalcib/esbuild-react-native-web-v-final-465p
 * import esbuild from 'esbuild';
import {createServer, request} from 'http';
import {spawn} from 'child_process';
import {parse, resolve} from 'path';
import fs from 'fs';
import dayjs from 'dayjs';

import * as app from './app.json' assert {type: 'json'};
// const app = require('./app.json');

const version = 1; //dayjs().valueOf();
const servedir = './dist';

const isDev = !(process.argv[2] === 'build');
process.env.NODE_EV = isDev ? 'development' : 'production';
const clients = [];

const templateCache = {
  name: 'templateCache',
  setup(build) {
    build.onEnd(() => {
      const index = fs.readFileSync('./web/template.html', {encoding: 'utf-8'});
      const newIndex = index.replaceAll('%%VERSION%%', version);

      if (!fs.existsSync(servedir)) {
        fs.mkdirSync(servedir);
      }

      fs.writeFileSync(`${servedir}/index.html`, newIndex);
    });
  },
};

esbuild
  .build({
    entryPoints: ['index.js'],
    outfile: `${servedir}/js/bundle.web.${version}.js`,
    tsconfig: 'tsconfig.json',
    define: {
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
      'process.env.APP_MANIFEST': JSON.stringify(app),
      __DEV__: JSON.stringify(isDev),
      global: 'window',
    },
    loader: {
      '.png': 'file',
      '.jpg': 'file',
      '.ttf': 'file',
      '.js': 'jsx',
    },
    resolveExtensions: [
      '.web.tsx',
      '.web.ts',
      '.web.jsx',
      '.web.js',
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
    ],
    format: 'esm',
    bundle: true,
    minify: !isDev,
    assetNames: 'assets/[name]-[hash]',
    sourcemap: true,

    plugins: [
      {
        name: 'material-icons',
        setup(build) {
          build.onResolve(
            {filter: /MaterialCommunityIcons\.(ttf|json)/},
            args => {
              return {
                path: resolve(
                  `./src/assets/materialdesignicons-webfont${
                    parse(args.path).ext
                  }`,
                ),
              };
            },
          );
        },
      },
    ],
    publicPath: '/',
    banner: isDev
      ? {
          js: '(() => new EventSource("/esbuild").onmessage = () => location.reload())()',
        }
      : {},
  })
  .then((result, error) => {})
  .catch(() => process.exit(1));

isDev &&
  false &&
  esbuild.serve({serverdir: './public'}, {}).then(() => {
    createServer((req, res) => {
      const {url, method, headers} = req;
      if (req.url == '/esbuild') {
        return clients.push(
          res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
          }),
        );
      }

      const path = url.split('/').pop().indexOf('.') ? url : '/index.html';
      req.pipe(
        request(
          {hostname: '0.0.0.0', port: 8000, path, method, headers},
          prxRes => {
            res.writeHead(prxRes.statusCode, prxRes.headers);
            prxRes.pipe(res, {end: true});
          },
        ),
        {end: true},
      );
    }).listen(3000);

    setTimeout(() => {
      const op = {
        darwin: ['open'],
        linux: ['xdg-open'],
        win32: ['cmd', '/c', 'start'],
      };
      const ptf = process.platform;
      if (clients.length === 0) {
        spawn(op[ptf][0], [...[pt[ptf].slice(1)], 'http://localhost:3000']);
      }
    }, 1000);
  });

// import esbuild from 'esbuild';
// // import devServer from 'esbuild-dev-server';
// import open from 'open';
// import fs from 'fs';
// import dayjs from 'dayjs';

// const version = dayjs().valueOf();
// const servedir = './dist';

// const templateCache = {
//   name: 'templateCache',
//   setup(build) {
//     build.onEnd(() => {
//       const index = fs.readFileSync('./web/template.html', {encoding: 'utf-8'});
//       const newIndex = index.replaceAll('%%VERSION%%', version);

//       if (!fs.existsSync(servedir)) {
//         fs.mkdirSync(servedir);
//       }

//       fs.writeFileSync(`${servedir}/index.html`, newIndex);
//     });
//   },
// };

// (async function () {
//   const cxt = await esbuild.context({
//     entryPoints: ['index.js'],
//     bundle: true,
//     outfile: `${servedir}/js/bundle.web.${version}.js`,
//     alias: {
//       'react-native': 'react-native-web',
//     },
//     loader: {
//       '.js': 'tsx',
//     },
//     plugins: [templateCache],
//   });

//   // const port = '8080';
//   let {port} = await cxt.serve({servedir}).catch(async () => {
//     await cxt.dispose();
//   });

//   open(`http://localhost:${port}`);
// })();

 */
