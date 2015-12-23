import './logViewer.css';
import logViewerDirective from './logViewer.directive';


export default angular.module('dockerPDE.logViewer', [])
	.directive('logViewer', logViewerDirective.instance)
	.name