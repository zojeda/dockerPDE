require('json-editor');
let aje = require('angular-json-editor');

require('ace/ace');
require('ace/ext-language_tools');
require('ace/mode-markdown');
require('ace/snippets/markdown');

import DockerDefinitionDirective from './definitionEditor.directive';


export default angular.module('dockerPDE.definitionEditor', ['angular-json-editor'])
	.directive('definition', DockerDefinitionDirective.instance)
	.name;