import angular = require("angular");
import "angular-animate";
import "angular-aria";
import "angular-messages";
import "angular-material/angular-material";
import "angular-material/angular-material.css";


import devEnvironment from "./devEnvironment/devEnvironment.component";
import applications from "./applications/applications.component";


class ProjectsController {
	project = {
		devEnvironment: {
			commands: {
				start: { description: "Start the application", style: "fa fa-play" },
				clean: { description: "Remove all dependencies and built assets", style: "fa fa-trash" },
				install: { description: "Install all dependencies", style: "fa fa-laptop"  }
			}
		}
	}
}

angular.module("app", ["ngMaterial", "ngMessages"])
	.controller("ProjectsController", ProjectsController)
	.component("devEnvironment", devEnvironment)
	.component("applications", applications)
	.config(function($mdThemingProvider) {
		$mdThemingProvider.theme("default")
			.dark();
	});