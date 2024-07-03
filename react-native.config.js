const {createEsbuildCommands, babelPlugin} = require('react-native-esbuild');

const commands = createEsbuildCommands(config => ({
  ...config,
  plugins: config.plugins.concat(
    babelPlugin({
      filter: /src\/.*\.(jsx?|tsx?)$/,
    }),
  ),
}));

module.exports = {
  commands,
};
