/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';

import App from './src/App';
import app from './app.json';

const {name: appName} = app;

AppRegistry.registerComponent(appName, () => App);

if (typeof module.hot?.accept === 'function') {
  module.hot.accept();
}

if (Platform.OS === 'web') {
  AppRegistry.runApplication(appName, {
    initialProps: {},
    rootTag: document.getElementById('react-native-web-app'),
  });
}
