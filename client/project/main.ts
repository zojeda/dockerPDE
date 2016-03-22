import angular = require("angular");
import "angular-animate";
import "angular-aria";
import "angular-messages";
import "angular-material/angular-material";
import "angular-material/angular-material.css";


import devEnvironment from "./devEnvironment/devEnvironment.component";


class ProjectsController {
	project = {
		devEnvironment: {
			commands: {
					start: { description : "Start the application"	},
					clean: { description : "Remove all dependencies and built assets"	},
					install: { description : "Install all dependencies"	}
			}
		}
	}
}

angular.module("app", ["ngMaterial", "ngMessages"])
	.controller("ProjectsController", ProjectsController)
	.component("devEnvironment", devEnvironment);