import "font-awesome/less/font-awesome.less";
import "./devEnvironment.css";

class DevEnvironment { };

let devEnvironment: angular.IComponentOptions = {
	controller: DevEnvironment,
	template: `
				<md-sidenav
					class="md-sidenav-left"
					md-component-id="left"
					md-is-locked-open="$mdMedia('gt-md')"
					md-disable-backdrop
					md-whiteframe="1">
				<md-content layout-padding layout="column" style="width: 50px;">

					<md-button aria-label="menu" class="md-fab md-warn" layout-align="center center">
						<h2><i class="fa fa-laptop"></i></h2>
					</md-button>
		
					<md-button ng-repeat="(command, details) in dev.environment.commands" aria-label="Command" class="devCommandButton md-fab md-raised md-mini">
						<i class="fa fa-laptop"></i>
					</md-button>
				</md-content>
			</md-sidenav>

	`,
	controllerAs: "dev",
	bindings: {
    environment: "="
  }
};


export default devEnvironment;