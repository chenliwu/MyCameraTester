/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';

import CameraTester from './src/cameraTester';
import FaceDetection from './src/FaceDetection';

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => FaceDetection);
