import angular = require("angular");
import "angular-ui-router";
import "angular-animate";
import "angular-aria";
import "angular-messages";
import "angular-material/angular-material";
import "angular-material/angular-material.css";

import workspace from "./workspace.component";
import service from "./service/service.component";
import devEnvironment from "./devEnvironment/devEnvironment.component";
import applications from "./applications/applications.component";




angular.module("app", ["ngMaterial", "ngMessages", "ui.router"])
  .value("workspaceBaseUrl", "http://localhost:4444/")
	.component("devEnvironment", devEnvironment)
	.component("applications", applications)
  .component("service", service)
  .component("workspace", workspace)
	.config(function($mdThemingProvider) {
		$mdThemingProvider.theme("default")
			.dark();
	})
  .config(($stateProvider : ng.ui.IStateProvider)  => {
        $stateProvider.state("workspace", {
        url: "/:userName/:workspaceName",
        template: "<workspace></workspace>",
    });
  });