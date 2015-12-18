require('json-editor');
let aje = require('angular-json-editor');
var ace = require('ace-builds/src-noconflict/ace');

import DockerDefinitionDirective from './definitionEditor.directive';


export default angular.module('dockerPDE.definitionEditor', ['angular-json-editor'])
	.directive('definition', DockerDefinitionDirective.instance)
	.name;