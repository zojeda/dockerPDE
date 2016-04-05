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
import application from "./application/application.component";




angular.module("app", ["ngMaterial", "ngMessages", "ui.router"])
  .factory("workspaceBaseUrl", ($window: ng.IWindowService) => `${$window.location.protocol}//${$window.location.hostname}:4444/`)
  .component("devEnvironment", devEnvironment)
  .component("application", application)
  .component("service", service)
  .component("workspace", workspace)
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme("default")
      .dark();
  })
  .config(($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state("workspace", {
      url: "/:userName/:workspaceName",
      template: "<workspace></workspace>",
    });
  })
  .config(($stateProvider: ng.ui.IStateProvider) => {
    $stateProvider.state("workspace.application", {
      url: "/app?applicationName",
      template: "<application></application>",
      resolve: {
        userName: function($stateParams) {
          return $stateParams.userName;
        },
        workspaceName: function($stateParams) {
          return $stateParams.workspaceName;
        }
      }
    });
  });  