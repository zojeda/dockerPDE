import angular = require('angular');

import 'bootstrap/dist/css/bootstrap.css';

import definitionEditor from './definitionEditor';

import logViewer from './logViewer';


angular.module('app', [definitionEditor, logViewer])