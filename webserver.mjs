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
