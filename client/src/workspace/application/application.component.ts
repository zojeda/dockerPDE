import "./application.css";


class ApplicationController {
  url: string;
  constructor($stateParams: ng.ui.IStateParamsService, $window: ng.IWindowService, $sce: ng.ISCEService) {
    let protocol = $window.location.protocol;
    let hostname = $window.location.hostname;
    let port = $window.location.port;
    let applicationName = $stateParams["applicationName"];
    let workspace = $stateParams["userName"]+$stateParams["workspaceName"];
    let urlStr = `${protocol}//${applicationName}.${workspace}.${hostname}:${port}`;
    this.url = $sce.trustAsResourceUrl(urlStr);
    console.log(this.url);
  }
};

let applications: angular.IComponentOptions = {
	controller: ApplicationController,
	template: require("./application.html"),
	controllerAs: "appCtrl",
};


export default applications;