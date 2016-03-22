import "font-awesome/less/font-awesome.less";
import "./devEnvironment.css";

class DevEnvironment { };

let devEnvironment: angular.IComponentOptions = {
	controller: DevEnvironment,
	template: `
			<md-button aria-label="menu" class="md-fab md-warn">
				<h2><i class="fa fa-laptop"></i></h2>
			</md-button>

			<md-button ng-repeat="(command, details) in dev.environment.commands" aria-label="Command" class="devCommandButton md-fab md-raised md-mini">
				<i class="fa fa-laptop"></i>
			</md-button>
	`,
	controllerAs: "dev",
	bindings: {
    environment: "="
  }
};


export default devEnvironment;