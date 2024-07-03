/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';

import App from './src/App';
import app from './app.json';

const {name: appName} = app;

AppRegistry.registerComponent(appName, () => App);
